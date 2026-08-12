# Liquid Glass Navigation Architecture (Current Implementation)

## Goal
Enable authentic iOS Liquid Glass tab bar behavior for accessibility testing while keeping the existing React Navigation drawer app structure.

## What Is Running Now
- Drawer navigation remains the app-level route model in React Native.
- iOS root controller is a real `UITabBarController` (`LiquidGlassRootTabBarController` in `ios/a11yPlayground/AppDelegate.swift`).
- React Native's root view is permanently mounted inside the Home tab content view.
- Search and Profile tabs are intentional placeholder screens used only to test tab bar state changes.
- The native Liquid Glass tab bar is hidden by default and only shown when the active RN route is `Liquid Glass Tab Bar`.

## Why This Root Design Is Required
Liquid Glass tab features under test depend on `UITabBarController` APIs, specifically:
- `tabBarMinimizeBehavior`
- `bottomAccessory` / `UITabAccessory`

A standalone `UITabBar` overlay does not expose these behaviors with parity.

## Route-Scoped Visibility
- `App.tsx` tracks active React Navigation route name.
- When route name is `Liquid Glass Tab Bar`, RN calls native to show the iOS tab bar.
- On all other routes, RN calls native to hide it.

## Native Bridge Surface
`ios/a11yPlayground/NativeBarModuleBridge.m` exports `NativeBarModule` with:
- `presentNativeBarDemo()`
- `presentNativeTabBarDemo(options)` where options include:
  - `minimizeBehavior`
  - `showBottomAccessory`
- `setLiquidGlassTabBarHidden(hidden:animated:)`

## Test Surfaces
1. App-integrated route
- Screen: `Liquid Glass Tab Bar` (`screens/LiquidGlassTabBar.tsx`)
- Uses the real root native tab bar and accessory
- Includes long scroll content and visual transparency test stripes

2. Full-screen native harness
- Presented via `presentNativeTabBarDemo(options)`
- Isolated baseline for native tab+nav behavior

## Accessibility Notes (Current)
- Scroll spacing is protected by RN `ScrollView` using `contentInsetAdjustmentBehavior="automatic"`, so content is not clipped under the bar.
- VoiceOver behavior during minimize/expand is still an active test area and can differ from touch gesture behavior depending on iOS system handling.
- Search/Profile remain placeholder content by design; this is a bar-behavior test harness, not production IA.

## Explicit Non-Goals
- Replacing drawer navigation with native tabs for app routing.
- Shipping this as final product navigation architecture.

## Practical Guidance
- Keep route orchestration in RN.
- Keep Liquid Glass controller-specific behavior in native UIKit.
