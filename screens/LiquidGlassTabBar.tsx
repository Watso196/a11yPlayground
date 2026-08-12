import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  NativeModules,
  Alert,
} from 'react-native';
import styles from '../styles/commonStyles';

const LiquidGlassTabBarScreen = () => {
  const scrollTestItems = Array.from({length: 10}, (_, index) => index + 1);

  const openNativeNavDemo = () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('iOS only', 'This native navigation bar demo is only available on iOS.');
      return;
    }

    const module = NativeModules.NativeBarModule as
      | {
          presentNativeBarDemo?: () => void;
          presentNativeTabBarDemo?: (options: {
            minimizeBehavior: string;
            showBottomAccessory: boolean;
          }) => void;
        }
      | undefined;

    if (!module?.presentNativeTabBarDemo && !module?.presentNativeBarDemo) {
      Alert.alert(
        'Native module unavailable',
        'NativeBarModule is not registered. Rebuild the iOS app and try again.',
      );
      return;
    }

    if (module.presentNativeTabBarDemo) {
      module.presentNativeTabBarDemo({minimizeBehavior: 'automatic', showBottomAccessory: false});
      return;
    }

    module.presentNativeBarDemo?.();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.navDemoScrollContent}
      // Let UIKit reserve space for the real (possibly expanded/minimized) native tab bar
      // instead of a fixed padding guess, so scrolled content is never cut off underneath it.
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.iosOnlyWarningBanner}>
        <Text style={styles.iosOnlyWarningText}>
          ⚠️ iOS only: the native tab bar, accessory, and demos on this screen
          are not available on Android.
        </Text>
      </View>

      <View style={styles.testingInstructionsPanel}>
        <Text style={styles.subtext}>What to expect</Text>
        <Text style={styles.text}>
          • The tab bar only appears on this screen, with its bottom accessory
          always shown.
        </Text>
        <Text style={styles.text}>
          • Scroll down to minimize the tab bar into a small icon-only pill.
        </Text>
        <Text style={styles.text}>
          • To expand it again, tap the tab bar or scroll all the way back
          to the top — a partial scroll up will not re-expand it, since an
          attached accessory requires that stronger "commit" gesture.
        </Text>
        <Text style={styles.text}>
          • Home/Search/Profile are decorative tabs for testing the bar itself;
          Search and Profile intentionally show placeholder screens. This allows us
          to test changes to the bar's state.
        </Text>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Open native iOS tab bar and navigation bar demo"
        onPress={openNativeNavDemo}
        style={styles.button}>
        <Text>Open Native iOS Tab + Nav Bar Demo</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Glass transparency check: scroll until these color bands sit directly
        behind the tab bar. A flat white background makes Liquid Glass adapt to
        increase contrast — saturated color backgrounds like this 
        are the actual test case for contrast and blur behavior.
      </Text>
      <View style={styles.glassTransparencyTestBlock}>
        <View style={styles.glassTransparencyStripeRed} />
        <View style={styles.glassTransparencyStripeOrange} />
        <View style={styles.glassTransparencyStripeBlue} />
        <View style={styles.glassTransparencyStripeMagenta} />
        <View style={styles.glassTransparencyStripeTeal} />
      </View>

      <Text style={styles.text}>
        Scroll test content below. This section is intentionally long so you can
        trigger repeated collapse/expand behavior with touch and screen reader
        gestures on the liquid glass tab bar overlaying this page.
      </Text>

      {scrollTestItems.map(item => (
        <View key={item} style={styles.scrollTestCard}>
          <Text style={styles.scrollTestTitle}>Scrollable Test Item {item}</Text>
          <Text style={styles.scrollTestMeta}>
            Use this row while swiping through content to validate liquid glass
            tab bar collapse behavior and VoiceOver focus stability.
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default LiquidGlassTabBarScreen;
