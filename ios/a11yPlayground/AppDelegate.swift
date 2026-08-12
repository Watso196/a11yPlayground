import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "a11yPlayground"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }

  // Root the app in a real UITabBarController so the tab bar gets genuine system
  // Liquid Glass rendering (floating shape, minimize behavior, bottom accessory),
  // instead of a hand-rolled UITabBar overlay that can't access those APIs.
  override func createRootViewController() -> UIViewController {
    LiquidGlassRootTabBarController.shared
  }

  override func setRootView(_ rootView: UIView, toRootViewController rootViewController: UIViewController) {
    LiquidGlassRootTabBarController.shared.attach(reactRootView: rootView)
  }
}

@objc(NativeBarModule)
class NativeBarModule: NSObject {
  @objc(presentNativeBarDemo)
  func presentNativeBarDemo() {
    DispatchQueue.main.async {
      guard let presenter = UIApplication.topMostViewController() else {
        return
      }

      let demoRoot = NativeBarDemoViewController()
      let navigationController = UINavigationController(rootViewController: demoRoot)
      navigationController.modalPresentationStyle = .fullScreen
      navigationController.navigationBar.prefersLargeTitles = true

      // Use native system materials so accessibility settings can influence the glass effect.
      let appearance = UINavigationBarAppearance()
      appearance.configureWithTransparentBackground()
      appearance.backgroundEffect = UIBlurEffect(style: .systemUltraThinMaterial)
      appearance.backgroundColor = UIColor.systemBackground.withAlphaComponent(0.45)
      appearance.shadowColor = UIColor.separator.withAlphaComponent(0.25)

      navigationController.navigationBar.standardAppearance = appearance
      navigationController.navigationBar.scrollEdgeAppearance = appearance
      navigationController.navigationBar.compactAppearance = appearance
      if #available(iOS 15.0, *) {
        navigationController.navigationBar.compactScrollEdgeAppearance = appearance
      }

      presenter.present(navigationController, animated: true)
    }
  }

  @objc(presentNativeTabBarDemo:)
  func presentNativeTabBarDemo(_ options: NSDictionary) {
    let minimizeBehaviorMode = options["minimizeBehavior"] as? String ?? "automatic"
    let bottomAccessoryVisible = options["showBottomAccessory"] as? Bool ?? false

    DispatchQueue.main.async {
      guard let presenter = UIApplication.topMostViewController() else {
        return
      }

      let tabController = NativeTabBarDemoController()
      tabController.minimizeBehaviorMode = minimizeBehaviorMode
      tabController.bottomAccessoryVisible = bottomAccessoryVisible
      tabController.modalPresentationStyle = .fullScreen
      presenter.present(tabController, animated: true)
    }
  }

  @objc(setLiquidGlassTabBarHidden:animated:)
  func setLiquidGlassTabBarHidden(_ hidden: Bool, animated: Bool) {
    DispatchQueue.main.async {
      LiquidGlassRootTabBarController.shared.setLiquidGlassTabBarHidden(hidden, animated: animated)
    }
  }
}

// Real iOS 26 tab bar minimize/accessory API (HIG: "Tab bars" collapse behavior). Deployment
// target is 15.1, so every use is gated behind #available checks with an older-OS fallback.
@available(iOS 26.0, *)
private func resolvedMinimizeBehavior(for mode: String) -> UITabBarController.MinimizeBehavior {
  switch mode {
  case "never":
    return .never
  case "onScrollDown":
    return .onScrollDown
  case "onScrollUp":
    return .onScrollUp
  default:
    return .automatic
  }
}

@available(iOS 26.0, *)
private func makeAccessoryContentView(text: String) -> UIView {
  let effectView = UIVisualEffectView(effect: UIBlurEffect(style: .systemUltraThinMaterial))
  effectView.layer.cornerRadius = 10
  effectView.clipsToBounds = true
  effectView.translatesAutoresizingMaskIntoConstraints = false
  // Minimum, not fixed, height: large accessibility text sizes need to grow past 44pt.
  effectView.heightAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true

  // This accessory has no tap action, so it must not claim the .button trait (VoiceOver/Switch
  // Control/Voice Control users would expect double-tap to do something, and nothing happens).
  effectView.isAccessibilityElement = true
  effectView.accessibilityLabel = text
  effectView.accessibilityTraits = .staticText

  let label = UILabel()
  label.translatesAutoresizingMaskIntoConstraints = false
  label.text = text
  label.font = .preferredFont(forTextStyle: .footnote)
  label.adjustsFontForContentSizeCategory = true
  label.numberOfLines = 0
  label.textAlignment = .center
  label.textColor = .label

  effectView.contentView.addSubview(label)
  NSLayoutConstraint.activate([
    label.leadingAnchor.constraint(equalTo: effectView.contentView.leadingAnchor, constant: 12),
    label.trailingAnchor.constraint(equalTo: effectView.contentView.trailingAnchor, constant: -12),
    label.topAnchor.constraint(greaterThanOrEqualTo: effectView.contentView.topAnchor, constant: 8),
    label.bottomAnchor.constraint(lessThanOrEqualTo: effectView.contentView.bottomAnchor, constant: -8),
    label.centerYAnchor.constraint(equalTo: effectView.contentView.centerYAnchor)
  ])

  return effectView
}

// Real root view controller: hosts React Native content behind a genuine system tab bar so
// Liquid Glass rendering, minimize behavior, and the bottom accessory are all authentic.
final class LiquidGlassRootTabBarController: UITabBarController {
  static let shared = LiquidGlassRootTabBarController()

  // "automatic" leaves the exact scroll-tied behavior up to the system heuristic, which isn't
  // guaranteed to minimize on scroll; use "onScrollDown" so this is reliably testable.
  var minimizeBehaviorMode: String = "onScrollDown" {
    didSet {
      applyMinimizeBehaviorAndAccessory()
    }
  }

  var bottomAccessoryVisible: Bool = true {
    didSet {
      applyMinimizeBehaviorAndAccessory()
    }
  }

  private weak var reactRootView: UIView?

  private let homeContent = UIViewController()
  private let searchContent = UIViewController()
  private let profileContent = UIViewController()

  override func viewDidLoad() {
    super.viewDidLoad()

    homeContent.tabBarItem = UITabBarItem(title: "Home", image: UIImage(systemName: "house"), selectedImage: UIImage(systemName: "house.fill"))
    searchContent.tabBarItem = UITabBarItem(title: "Search", image: UIImage(systemName: "magnifyingglass"), selectedImage: UIImage(systemName: "magnifyingglass"))
    profileContent.tabBarItem = UITabBarItem(title: "Profile", image: UIImage(systemName: "person"), selectedImage: UIImage(systemName: "person.fill"))

    // Only Home hosts the real React Native app (see attach(reactRootView:)); Search/Profile are
    // decorative placeholder tabs that exist purely to test the tab bar chrome itself, so nothing
    // ever needs to move between tabs (that reparenting is what caused a crash on tab selection).
    [searchContent, profileContent].forEach { addPlaceholderLabel(to: $0) }

    viewControllers = [homeContent, searchContent, profileContent]
    selectedIndex = 0

    // Hidden by default; RN only shows it while testing on the Liquid Glass Tab Bar screen.
    setLiquidGlassTabBarHidden(true, animated: false)

    applyMinimizeBehaviorAndAccessory()
  }

  private func addPlaceholderLabel(to viewController: UIViewController) {
    let label = UILabel()
    label.translatesAutoresizingMaskIntoConstraints = false
    label.text = "Decorative tab for testing the tab bar only."
    label.numberOfLines = 0
    label.textAlignment = .center
    label.font = .preferredFont(forTextStyle: .body)
    label.adjustsFontForContentSizeCategory = true
    label.textColor = .secondaryLabel

    viewController.view.backgroundColor = .systemBackground
    viewController.view.addSubview(label)
    NSLayoutConstraint.activate([
      label.leadingAnchor.constraint(equalTo: viewController.view.layoutMarginsGuide.leadingAnchor),
      label.trailingAnchor.constraint(equalTo: viewController.view.layoutMarginsGuide.trailingAnchor),
      label.centerYAnchor.constraint(equalTo: viewController.view.centerYAnchor)
    ])
  }

  // Called once React Native's root view exists (see AppDelegate.setRootView). Parented
  // permanently inside the Home tab's own content view -- the normal place UIKit expects tab
  // content to live -- instead of as a floating sibling whose z-order we'd have to keep
  // fighting UIKit's private view hierarchy to maintain.
  func attach(reactRootView newRootView: UIView) {
    guard reactRootView == nil else {
      return
    }

    reactRootView = newRootView
    newRootView.translatesAutoresizingMaskIntoConstraints = false
    homeContent.view.addSubview(newRootView)

    NSLayoutConstraint.activate([
      newRootView.leadingAnchor.constraint(equalTo: homeContent.view.leadingAnchor),
      newRootView.trailingAnchor.constraint(equalTo: homeContent.view.trailingAnchor),
      newRootView.topAnchor.constraint(equalTo: homeContent.view.topAnchor),
      newRootView.bottomAnchor.constraint(equalTo: homeContent.view.bottomAnchor)
    ])
  }

  func setLiquidGlassTabBarHidden(_ hidden: Bool, animated: Bool) {
    if #available(iOS 18.0, *) {
      setTabBarHidden(hidden, animated: animated)
    } else {
      tabBar.isHidden = hidden
    }

    // The accessory only makes sense while the tab bar itself is visible.
    bottomAccessoryVisible = !hidden
  }

  private func applyMinimizeBehaviorAndAccessory() {
    guard #available(iOS 26.0, *) else {
      return
    }

    tabBarMinimizeBehavior = resolvedMinimizeBehavior(for: minimizeBehaviorMode)

    if bottomAccessoryVisible {
      let content = makeAccessoryContentView(text: "Bottom accessory: native UITabAccessory")
      setBottomAccessory(UITabAccessory(contentView: content), animated: true)
    } else {
      setBottomAccessory(nil, animated: true)
    }
  }
}

private class NativeTabBarDemoController: UITabBarController {
  var minimizeBehaviorMode: String = "automatic"
  var bottomAccessoryVisible: Bool = false

  override func viewDidLoad() {
    super.viewDidLoad()

    let feed = NativeScrollableDemoViewController(
      screenTitle: "Feed",
      itemPrefix: "Feed item"
    )
    feed.tabBarItem = UITabBarItem(
      title: "Feed",
      image: UIImage(systemName: "house"),
      selectedImage: UIImage(systemName: "house.fill")
    )

    let updates = NativeScrollableDemoViewController(
      screenTitle: "Updates",
      itemPrefix: "Update"
    )
    updates.tabBarItem = UITabBarItem(
      title: "Updates",
      image: UIImage(systemName: "bell"),
      selectedImage: UIImage(systemName: "bell.fill")
    )

    let settings = NativeScrollableDemoViewController(
      screenTitle: "Settings",
      itemPrefix: "Setting"
    )
    settings.tabBarItem = UITabBarItem(
      title: "Settings",
      image: UIImage(systemName: "gearshape"),
      selectedImage: UIImage(systemName: "gearshape.fill")
    )

    let feedNav = NativeBarDemoViewController.navigationWrappedController(root: feed)
    let updatesNav = NativeBarDemoViewController.navigationWrappedController(root: updates)
    let settingsNav = NativeBarDemoViewController.navigationWrappedController(root: settings)

    setViewControllers([feedNav, updatesNav, settingsNav], animated: false)
    selectedIndex = 0

    let tabAppearance = UITabBarAppearance()
    tabAppearance.configureWithTransparentBackground()
    tabAppearance.backgroundEffect = UIBlurEffect(style: .systemUltraThinMaterial)
    tabAppearance.backgroundColor = UIColor.systemBackground.withAlphaComponent(0.5)
    tabAppearance.shadowColor = UIColor.separator.withAlphaComponent(0.25)

    tabBar.standardAppearance = tabAppearance
    if #available(iOS 15.0, *) {
      tabBar.scrollEdgeAppearance = tabAppearance
    }

    applyMinimizeBehaviorAndAccessory()
  }

  private func applyMinimizeBehaviorAndAccessory() {
    guard #available(iOS 26.0, *) else {
      return
    }

    tabBarMinimizeBehavior = resolvedMinimizeBehavior(for: minimizeBehaviorMode)

    if bottomAccessoryVisible {
      let content = makeAccessoryContentView(text: "Bottom accessory: native UITabAccessory")
      setBottomAccessory(UITabAccessory(contentView: content), animated: false)
    } else {
      setBottomAccessory(nil, animated: false)
    }
  }
}

private class NativeScrollableDemoViewController: UITableViewController {
  private let screenTitle: String
  private let itemPrefix: String

  init(screenTitle: String, itemPrefix: String) {
    self.screenTitle = screenTitle
    self.itemPrefix = itemPrefix
    super.init(style: .insetGrouped)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override func viewDidLoad() {
    super.viewDidLoad()

    title = screenTitle
    navigationItem.largeTitleDisplayMode = .always
    navigationItem.rightBarButtonItem = UIBarButtonItem(
      barButtonSystemItem: .close,
      target: self,
      action: #selector(closeDemo)
    )

    tableView.accessibilityLabel = "\(screenTitle) list"
    tableView.rowHeight = UITableView.automaticDimension
    tableView.estimatedRowHeight = 56
    tableView.contentInsetAdjustmentBehavior = .automatic
  }

  override func numberOfSections(in tableView: UITableView) -> Int {
    1
  }

  override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    40
  }

  override func tableView(
    _ tableView: UITableView,
    cellForRowAt indexPath: IndexPath
  ) -> UITableViewCell {
    let identifier = "native-demo-cell"
    let cell = tableView.dequeueReusableCell(withIdentifier: identifier)
      ?? UITableViewCell(style: .subtitle, reuseIdentifier: identifier)

    let row = indexPath.row + 1
    cell.textLabel?.text = "\(itemPrefix) \(row)"
    cell.detailTextLabel?.text = "Scroll to collapse and expand the large title nav bar."
    cell.accessoryType = .disclosureIndicator
    cell.isAccessibilityElement = true
    cell.accessibilityLabel = "\(itemPrefix) \(row)"
    cell.accessibilityHint = "Double tap to open details"

    return cell
  }

  override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let details = NativeBarDetailViewController()
    details.title = "\(itemPrefix) \(indexPath.row + 1)"
    navigationController?.pushViewController(details, animated: true)
  }

  @objc private func closeDemo() {
    dismiss(animated: true)
  }
}

private class NativeBarDemoViewController: UIViewController {
  static func navigationWrappedController(root: UIViewController) -> UINavigationController {
    let navigationController = UINavigationController(rootViewController: root)
    navigationController.navigationBar.prefersLargeTitles = true

    applyNavigationAppearance(to: navigationController, materialVariant: "ultraThin")

    return navigationController
  }

  static func applyNavigationAppearance(
    to navigationController: UINavigationController,
    materialVariant: String
  ) {
    let appearance = UINavigationBarAppearance()
    appearance.configureWithTransparentBackground()

    switch materialVariant {
    case "thin":
      appearance.backgroundEffect = UIBlurEffect(style: .systemThinMaterial)
      appearance.backgroundColor = UIColor.systemBackground.withAlphaComponent(0.55)
    case "solid":
      appearance.backgroundEffect = nil
      appearance.backgroundColor = UIColor.secondarySystemBackground
    default:
      appearance.backgroundEffect = UIBlurEffect(style: .systemUltraThinMaterial)
      appearance.backgroundColor = UIColor.systemBackground.withAlphaComponent(0.5)
    }

    appearance.shadowColor = UIColor.separator.withAlphaComponent(0.25)

    navigationController.navigationBar.standardAppearance = appearance
    navigationController.navigationBar.scrollEdgeAppearance = appearance
    navigationController.navigationBar.compactAppearance = appearance
    if #available(iOS 15.0, *) {
      navigationController.navigationBar.compactScrollEdgeAppearance = appearance
    }
  }

  override func viewDidLoad() {
    super.viewDidLoad()

    title = "Native Glass Nav"
    view.backgroundColor = .systemBackground

    navigationItem.rightBarButtonItem = UIBarButtonItem(
      barButtonSystemItem: .close,
      target: self,
      action: #selector(closeDemo)
    )

    let bodyLabel = UILabel()
    bodyLabel.translatesAutoresizingMaskIntoConstraints = false
    bodyLabel.numberOfLines = 0
    bodyLabel.textAlignment = .center
    bodyLabel.text = "This screen is 100% native UIKit so you can test VoiceOver and base iOS navigation bar behavior."

    let pushButton = UIButton(type: .system)
    pushButton.translatesAutoresizingMaskIntoConstraints = false
    pushButton.setTitle("Push Native Detail Screen", for: .normal)
    pushButton.titleLabel?.font = .preferredFont(forTextStyle: .headline)
    pushButton.addTarget(self, action: #selector(openDetails), for: .touchUpInside)

    view.addSubview(bodyLabel)
    view.addSubview(pushButton)

    NSLayoutConstraint.activate([
      bodyLabel.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
      bodyLabel.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
      bodyLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -40),

      pushButton.topAnchor.constraint(equalTo: bodyLabel.bottomAnchor, constant: 24),
      pushButton.centerXAnchor.constraint(equalTo: view.centerXAnchor)
    ])
  }

  @objc private func openDetails() {
    let details = NativeBarDetailViewController()
    navigationController?.pushViewController(details, animated: true)
  }

  @objc private func closeDemo() {
    dismiss(animated: true)
  }
}

private class NativeBarDetailViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()

    title = "Detail"
    view.backgroundColor = .systemBackground

    let detailLabel = UILabel()
    detailLabel.translatesAutoresizingMaskIntoConstraints = false
    detailLabel.numberOfLines = 0
    detailLabel.textAlignment = .center
    detailLabel.text = "Use the native Back button to validate iOS accessibility behavior for nav transitions and announcements."

    view.addSubview(detailLabel)

    NSLayoutConstraint.activate([
      detailLabel.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
      detailLabel.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
      detailLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
    ])
  }
}

private extension UIApplication {
  static func topMostViewController(
    from base: UIViewController? = activeKeyWindow()?.rootViewController
  ) -> UIViewController? {
    if let navigationController = base as? UINavigationController {
      return topMostViewController(from: navigationController.visibleViewController)
    }

    if let tabController = base as? UITabBarController,
       let selected = tabController.selectedViewController {
      return topMostViewController(from: selected)
    }

    if let presented = base?.presentedViewController {
      return topMostViewController(from: presented)
    }

    return base
  }

  static func activeKeyWindow() -> UIWindow? {
    UIApplication.shared.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap { $0.windows }
      .first { $0.isKeyWindow }
  }
}

private extension UIView {
  func nearestViewController() -> UIViewController? {
    var responder: UIResponder? = self
    while let current = responder {
      if let viewController = current as? UIViewController {
        return viewController
      }
      responder = current.next
    }
    return nil
  }
}
