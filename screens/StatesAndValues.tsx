import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  StyleSheet,
  Pressable,
  AccessibilityState,
} from 'react-native';
import AccessibleSlider from '../components/AccessibleSlider';

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
        Interactive Buttons with Accessibility States
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
              accessibilityLabel={`Pressable with state ${state}`}
              accessibilityState={{[state]: activeStates[state]}}
              style={styles.button}>
              <Text>{`${state} = ${
                activeStates[state] ? 'true' : 'false'
              }`}</Text>
            </Pressable>
          </View>
        ))}

      <Text style={styles.sectionTitle}>
        Placeholder for Accessibility Values
      </Text>
      <Button
        onPress={() => setValuesExpanded(!valuesExpanded)}
        accessibilityState={{expanded: valuesExpanded}}
        title="Toggle State Controls"
      />
      {valuesExpanded && (
        <View>
          <AccessibleSlider />
        </View>
      )}

      <View id="bottomPaddingView" style={{height: 50}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 15,
    marginVertical: 8,
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  text: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    padding: 15,
  },
});

export default StatesAndValuesScreen;
