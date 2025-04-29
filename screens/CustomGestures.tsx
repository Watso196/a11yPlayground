import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  PanResponder,
  Animated,
  Button,
} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

export default function CustomGesturesScreen() {
  const [gestureMessage, setGestureMessage] = useState('');
  const pan = useRef(new Animated.ValueXY()).current;

  // PanResponder setup
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({x: gestureState.dx, y: 0});
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100) {
          Alert.alert('PanResponder: Swiped right!');
        }
        pan.setValue({x: 0, y: 0});
      },
    }),
  ).current;

  // Gesture Handler setup
  const swipeGesture = Gesture.Pan().onEnd(e => {
    if (e.translationX > 100) {
      runOnJS(setGestureMessage)('Swiped right with gesture-handler!');
    }
  });

  const reset = () => {
    setGestureMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Gesture Handler Block */}
      <Text style={styles.label}>
        🔹 Gesture Handler (react-native-gesture-handler)
      </Text>
      <GestureDetector gesture={swipeGesture}>
        <View style={[styles.box, {backgroundColor: '#fce4ec'}]}>
          <Text style={styles.text}>Swipe right using Gesture Handler!</Text>
        </View>
      </GestureDetector>
      <Text style={{marginTop: 10}}>{gestureMessage}</Text>
      {gestureMessage !== '' && <Button title="Reset" onPress={reset} />}

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* PanResponder Block */}
      <Text style={styles.label}>🔸 PanResponder (React Native core)</Text>
      <Animated.View
        style={[
          styles.box,
          {transform: [{translateX: pan.x}], backgroundColor: '#e3f2fd'},
        ]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>Swipe right using PanResponder!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  spacer: {
    height: 60,
  },
});
