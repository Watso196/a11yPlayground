// Screens published as standalone Expo Snacks (one per test case).
const SCREENS = [
  {title: 'Accessibility Actions', file: 'AccessibilityActions.tsx'},
  {title: 'Accessibility Roles', file: 'AccessibilityRoles.tsx'},
  {title: 'Common Components', file: 'CommonComponents.tsx'},
  {
    title: 'Custom Gestures',
    file: 'CustomGestures.tsx',
    dependencies: {
      'react-native-gesture-handler': {version: '*'},
      'react-native-reanimated': {version: '*'},
    },
    wrapWithGestureHandlerRoot: true,
  },
  {
    title: 'Dynamic Content Announcements',
    file: 'DynamicContentAnnouncements.tsx',
  },
  {title: 'Focus Control', file: 'FocusControl.tsx'},
  {title: 'Motion Reduction', file: 'MotionReduction.tsx'},
  {
    title: 'Nested and Adjacent Elements Demo',
    file: 'NestedAdjacentDemo.tsx',
  },
  {title: 'Navigation Bar', file: 'NavigationBar.tsx'},
];

// Screens intentionally excluded from Snack generation, with why. Every
// screen file under screens/ must appear in either SCREENS or EXCLUDED --
// generate-snacks.js fails the run if a screen is missing from both, so new
// screens can't be silently forgotten.
const EXCLUDED = [
  {
    title: 'Custom Component Patterns',
    file: 'CustomComponents.tsx',
    reason:
      'Renders components/AccessibleSlider.tsx, which uses react-native-external-keyboard (ships native android/ios code not preloaded in Expo Go).',
  },
  {
    title: 'States and Values',
    file: 'StatesAndValues.tsx',
    reason:
      'Renders components/AccessibleSlider.tsx, which uses react-native-external-keyboard (ships native android/ios code not preloaded in Expo Go).',
  },
  {
    title: 'Swipe Order Demo',
    file: 'SwipeOrderDemo.tsx',
    reason: 'Uses react-native-a11y-order, which ships native android/ios code not preloaded in Expo Go.',
  },
  {
    title: 'Liquid Glass Tab Bar',
    file: 'LiquidGlassTabBar.tsx',
    reason:
      "Calls NativeModules.NativeBarModule, a bespoke native module that only exists in this repo's own compiled iOS app.",
  },
];

module.exports = {SCREENS, EXCLUDED};
