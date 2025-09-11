import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from '../styles/commonStyles';

export default function NestedAdjacentDemoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nested Accessible Elements</Text>
      <Text style={styles.description}>Example 1</Text>
      <Text style={styles.subtext}>
        This example is built to demonstrate a commonly used pattern to dismiss
        the keyboard view on a tap outside an input. This pattern is used (as of
        9/11/25) in our app's "Create Account" flow, step 2, for a real-world
        example.
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styleSheet.formBox}>
          <Text style={styleSheet.label}>Name</Text>
          <TextInput accessibilityLabel="Name" style={styleSheet.input} />

          <Text style={styleSheet.label}>Address</Text>
          <TextInput accessibilityLabel="Address" style={styleSheet.input} />

          <Pressable
            style={styleSheet.mainButton}
            onPress={() => Alert.alert('Submit Button Activated')}
            accessibilityRole="button">
            <Text>Submit</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.description}>Example 2</Text>
      <Text style={styles.subtext}>
        This example is identical to Example 1, except that the
        TouchableWithoutFeedback has accessible=false set to ensure it does not
        affect VoiceOver by collapsing into a single accessible element. Note
        you can now access all UI inside the TouchableWithoutFeedback on
        VoiceOver.
      </Text>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styleSheet.formBox}>
          <Text style={styleSheet.label}>Name</Text>
          <TextInput accessibilityLabel="Name" style={styleSheet.input} />

          <Text style={styleSheet.label}>Address</Text>
          <TextInput accessibilityLabel="Address" style={styleSheet.input} />

          <Pressable
            style={styleSheet.mainButton}
            onPress={() => Alert.alert('Submit Button Activated')}
            accessibilityRole="button">
            <Text>Submit</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.description}>Example 3</Text>
      <Text style={styles.subtext}>
        Two Pressables, one nested inside the other. Note that in this example,
        on VoiceOver, when you activate the focused element, the Inner Button is
        activated.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert('Outer activated')}
        accessibilityRole="button">
        <Text>Outer Button </Text>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Inner activated')}
          accessibilityRole="button">
          <Text>Inner Button</Text>
        </Pressable>
      </Pressable>
      <Text style={styles.description}>Example 4</Text>
      <Text style={styles.subtext}>
        Again, two Pressables, one nested inside the other. However style has
        moved the nested button off to the right inside the parent button. Note
        that in this example, on VoiceOver, when you activate the focused
        element, the Outer Button is activated.
      </Text>
      <Pressable
        style={styleSheet.primary}
        onPress={() => Alert.alert('Primary activated')}
        accessibilityRole="button">
        <Text>Primary Button</Text>

        {/* Secondary arrow is a separate Pressable nested inside Primary */}
        <Pressable
          style={styleSheet.secondary}
          onPress={() => Alert.alert('Secondary activated')}
          accessibilityRole="button"
          accessibilityLabel="Secondary action">
          <Text style={styleSheet.arrow}>→</Text>
        </Pressable>
      </Pressable>
      <Text style={styles.title}>Adjacent Pressables</Text>
      <Text style={styles.description}>Example 5</Text>
      <View style={styleSheet.adjacentRow}>
        <Pressable
          style={styleSheet.adjacentButton}
          onPress={() => Alert.alert('Left activated')}
          accessibilityRole="button">
          <Text>Left Button</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('Right activated')}
          accessibilityRole="button">
          <Text>Right Button</Text>
        </Pressable>
      </View>
      <Text style={styles.description}>Example 6</Text>
      <Text style={styles.subtext}>
        Examples 6 and 7 are identical in the code order, the only change is
        style.
      </Text>
      <View style={styleSheet.stack}>
        <Pressable
          style={styleSheet.mainButton}
          onPress={() => Alert.alert('Main activated')}
          accessibilityRole="button">
          <Text>Main Button</Text>
        </Pressable>

        <Pressable
          style={styleSheet.iconButton1}
          onPress={() => Alert.alert('Icon activated')}
          accessibilityRole="button"
          accessibilityLabel="Next Item">
          <Text style={styleSheet.arrow}>→</Text>
        </Pressable>
      </View>
      <Text style={styles.description}>Example 7</Text>
      <Text style={styles.subtext}>
        Examples 6 and 7 are identical in the code order, the only change is
        style. Note the difference between how VoiceOver and TalkBack handle
        this case.
      </Text>
      {/* Stack container; children are siblings, not nested */}
      <View style={styleSheet.stack}>
        <Pressable
          style={styleSheet.mainButton}
          onPress={() => Alert.alert('Main activated')}
          accessibilityRole="button">
          <Text>Main Button</Text>
        </Pressable>

        <Pressable
          style={styleSheet.iconButton2}
          onPress={() => Alert.alert('Icon activated')}
          accessibilityRole="button"
          accessibilityLabel="Next Item">
          <Text style={styleSheet.arrow}>→</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styleSheet = StyleSheet.create({
  adjacentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjacentButton: {
    marginRight: 10,
    padding: 15,
    marginVertical: 8,
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#a3bfe3ff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  secondary: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {fontSize: 18, lineHeight: 18, color: '#1a73e8', fontWeight: '700'},
  stack: {
    position: 'relative',
    marginBottom: 40,
  },
  mainButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#a3c2ebff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  iconButton1: {
    position: 'absolute',
    right: 8,
    top: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  iconButton2: {
    position: 'absolute',
    width: 36,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
  },
  label: {fontSize: 14, marginBottom: 6},
  input: {
    borderWidth: 1,
    borderColor: '#0c0a0aff',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
  },
  formBox: {
    borderWidth: 1,
    borderColor: '#1c1b1bff',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    gap: 8,
    marginTop: 8,
  },
});
