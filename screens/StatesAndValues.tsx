import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  Pressable,
  AccessibilityState,
} from 'react-native';
import AccessibleSlider from '../components/AccessibleSlider';
import styles from '../styles/commonStyles';

const states: (keyof AccessibilityState)[] = [
  'busy',
  'checked',
  'disabled',
  'expanded',
  'selected',
];

const StatesAndValuesScreen = () => {
  const [statesExpanded, setStatesExpanded] = useState(false);
  const [valuesExpanded, setValuesExpanded] = useState(false);
  const [textValue, setTextValue] = useState<string | undefined>(undefined);

  const [activeStates, setActiveStates] = useState<Partial<AccessibilityState>>(
    {},
  );

  const toggleState = (stateName: keyof AccessibilityState) => {
    setActiveStates(prev => ({
      ...prev,
      [stateName]: !prev[stateName],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        This screen demonstrates various accessibility states and values in
        React Native.
      </Text>

      <Text style={styles.sectionTitle}>
        Pressables with Accessibility States
      </Text>
      <Button
        onPress={() => setStatesExpanded(!statesExpanded)}
        accessibilityState={{expanded: statesExpanded}}
        title="Toggle State Controls"
      />
      {statesExpanded &&
        states.map(state => (
          <View key={state}>
            <Pressable
              accessible
              onPress={() => {
                toggleState(state);
              }}
              accessibilityLabel={`${state} = ${
                activeStates[state] ? 'true' : 'false'
              }`}
              accessibilityState={{[state]: activeStates[state]}}
              style={styles.button}>
              <Text>{`${state} = ${
                activeStates[state] ? 'true' : 'false'
              }`}</Text>
            </Pressable>
          </View>
        ))}

      <Text style={styles.sectionTitle}>
        Pressables with Accessibility Values
      </Text>
      <Button
        onPress={() => setValuesExpanded(!valuesExpanded)}
        accessibilityState={{expanded: valuesExpanded}}
        title="Toggle State Controls"
      />
      {valuesExpanded && (
        <View>
          <AccessibleSlider />
          <Pressable
            accessible
            accessibilityLabel={`text = ${textValue ?? 'undefined'}`}
            accessibilityValue={{text: textValue}}
            style={styles.button}
            onPress={() => {
              setTextValue(textValue === undefined ? 'Text value' : undefined);
            }}>
            <Text>{`text = ${textValue ?? 'undefined'}`}</Text>
          </Pressable>
        </View>
      )}

      <View id="bottomPaddingView" style={{height: 50}} />
    </ScrollView>
  );
};

export default StatesAndValuesScreen;
