import React, {useEffect, useRef, useState} from 'react';
import {View, Text, AccessibilityInfo, Animated, Easing} from 'react-native';
import styles from '../styles/commonStyles';

const MotionReduction = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotionEnabled);
    const reduceMotionListener = (enabled: boolean) =>
      setReduceMotionEnabled(enabled);

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      reduceMotionListener,
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!reduceMotionEnabled) {
      spinValue.setValue(0); // Reset the animation value
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Optional: stop the animation when reduced motion is enabled
      spinValue.stopAnimation();
    }
  }, [reduceMotionEnabled, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motion Reduction</Text>
      <Text style={styles.description}>
        This screen demonstrates how to reduce motion for users who prefer it.
      </Text>
      <Text style={styles.description}>
        Reduce Motion is currently{' '}
        {reduceMotionEnabled ? 'enabled' : 'disabled'}.
      </Text>
      <Animated.Image
        source={require('../assets/images/loading.png')}
        style={[
          styles.image,
          !reduceMotionEnabled && {transform: [{rotate: spin}]},
        ]}
        accessibilityLabel="Loading"
      />
    </View>
  );
};

export default MotionReduction;
