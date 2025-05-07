import React, {useState, useCallback} from 'react';
import {Text, Pressable} from 'react-native';
import {ExternalKeyboardView} from 'react-native-external-keyboard';
import styles from '../styles/commonStyles';

const CustomSlider = ({step = 10}: {step?: number}) => {
  const [value, setValue] = useState(50); // Starting value
  const min = 0;
  const max = 100;

  const adjustValue = useCallback(
    (direction: 'left' | 'right') => {
      setValue(prev => {
        const next = direction === 'left' ? prev - step : prev + step;
        return Math.max(min, Math.min(max, next));
      });
    },
    [min, max, step],
  );

  return (
    <ExternalKeyboardView
      style={styles.sliderWrapper}
      onKeyUpPress={({nativeEvent}: {nativeEvent: any}) => {
        if (nativeEvent.key === 'ArrowRight') {
          adjustValue('right');
        } else if (nativeEvent.key === 'ArrowLeft') {
          adjustValue('left');
        }
      }}>
      <Text style={styles.sliderText}>Volume Slider</Text>
      <Pressable
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Volume slider"
        accessibilityValue={{min, max, now: value}}
        accessibilityActions={[
          {name: 'increment', label: `Increase volume by ${step}`},
          {name: 'decrement', label: `Decrease volume by ${step}`},
        ]}
        onAccessibilityAction={event => {
          switch (event.nativeEvent.actionName) {
            case 'increment':
              adjustValue('right');
              break;
            case 'decrement':
              adjustValue('left');
              break;
          }
        }}
        onPress={() => {}}
        style={styles.slider}>
        <Text style={styles.sliderText} accessible={false}>
          Volume: {value}
        </Text>
        <Text style={styles.sliderHint} accessible={false}>
          (Swipe up or down or use keyboard left or right arrow keys to adjust)
        </Text>
      </Pressable>
    </ExternalKeyboardView>
  );
};

export default CustomSlider;
