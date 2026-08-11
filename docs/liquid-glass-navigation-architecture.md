# Liquid Glass Navigation Architecture (RN + Native Hybrid)

## Goal
Add iOS native liquid glass tab/navigation behavior for accessibility testing while keeping the current React Native drawer/navigation structure.

## Non-Goals
- Replacing the app's primary navigation architecture.
- Creating a production navigation migration in this phase.

## Current Architecture (as built)
- App navigation remains React Navigation drawer-based (`DrawerNavigator`).
- The app's real native root view controller is `LiquidGlassRootTabBarController`
  (`ios/a11yPlayground/AppDelegate.swift`), a genuine `UITabBarController`. This is required
  because the floating Liquid Glass shape, `tabBarMinimizeBehavior`, and `bottomAccessory`
  (`UITabAccessory`) only exist on `UITabBarController` — a bare `UITabBar` added as an overlay
  view can never render true system Liquid Glass or expose those APIs.
- It has three tabs (Home/Search/Profile). Only **Home** hosts the real React Native app — its
  root view is parented once, permanently, inside `homeContent.view` (the normal place UIKit
  expects tab content to live). Search/Profile are simple decorative placeholder screens whose
  only purpose is to give the tab bar itself something to switch between for testing; nothing is
  ever reparented between tabs (an earlier attempt to share one view across all three tabs by
  moving it on each selection caused a crash).
- The tab bar is hidden by default and only shown while React Native's `Liquid Glass Tab Bar` route is
  active (`App.tsx` toggles this based on the current route name).
- A separate, fully independent surface — `NativeTabBarDemoController`, launched via
  `NativeBarModule.presentNativeTabBarDemo` — presents a full-screen native tab bar + nav bar
  demo for baseline testing without any RN content involved.

## Native Bridge (as built)
`ios/a11yPlayground/NativeBarModuleBridge.m` exposes `NativeBarModule` to RN:
- `presentNativeBarDemo()` — full-screen nav-bar-only demo (no tabs).
- `presentNativeTabBarDemo(options)` — full-screen tab bar + nav bar demo; `options` takes
  `minimizeBehavior` and `showBottomAccessory`.
- `setLiquidGlassTabBarHidden(hidden:animated:)` — shows/hides the real global tab bar; called by
  `App.tsx` based on the active route. Also drives the bottom accessory's visibility (it only
  makes sense while the bar itself is visible).

## Known Limitations
- VoiceOver's scroll gesture doesn't reliably trigger `tabBarMinimizeBehavior`'s scroll-linked
  minimize — the automatic behavior appears to key off real drag gestures, not the programmatic
  content-offset changes VoiceOver performs. Content is never covered because of this (the RN
  ScrollView's `contentInsetAdjustmentBehavior="automatic"` always reserves whatever the bar's
  *current* height actually is), but VoiceOver users don't get the "extra space" benefit of
  minimize that touch/sighted users do.
- The minimized tab bar's accessible name still reads the tab's own title (e.g. "Home") instead
  of describing the actual "expand the bar" action that control performs while minimized. We
  tried mutating `UITabBarItem.accessibilityLabel`/`accessibilityHint` for the selected item and
  forcing a refresh with `UIAccessibility.post(.layoutChanged, ...)` — the standard fix for
  VoiceOver not picking up a label change — but it had no effect. This suggests the minimized
  pill in the new Liquid Glass tab bar isn't sourced from `UITabBarItem`'s accessibility
  properties at all in that rendering mode; without Accessibility Inspector/device-level view
  debugging there's no reliable way to confirm what element VoiceOver actually reads there, so
  the attempt was scrapped rather than continuing to guess. Treat this as a known, real platform
  limitation worth documenting/reporting rather than something to keep working around blindly.

## Library vs Native Guidance
For this app's liquid glass and accessibility goals:
- Use libraries for route orchestration and non-critical styling.
- Use native modules for behavior that depends on UIKit controller semantics.

Practical rule:
- If behavior depends on UITabBarController/UINavigationController lifecycle or iOS-specific accessibility behavior, implement it natively.
- If behavior is simple orchestration/UI around test controls, keep it in RN.
