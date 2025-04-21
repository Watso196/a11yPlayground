import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  StyleSheet,
  AccessibilityRole,
} from 'react-native';

const roles = [
  'none',
  'button',
  'link',
  'search',
  'image',
  'keyboardkey',
  'text',
  'adjustable',
  'imagebutton',
  'header',
  'summary',
  'alert',
  'checkbox',
  'combobox',
  'menu',
  'menubar',
  'menuitem',
  'progressbar',
  'radio',
  'radiogroup',
  'scrollbar',
  'spinbutton',
  'switch',
  'tab',
  'tablist',
  'timer',
  'toolbar',
];

// Removed from the top level and moved inside the component

const AccessibilityRolesScreen = () => {
  const [interactiveExpanded, setInteractiveExpanded] = useState(false);
  const [nonInteractiveExpanded, setNonInteractiveExpanded] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        This screen demonstrates various accessibility roles on interactive and
        non-interactive elements in React Native.
      </Text>
      <Text style={styles.sectionTitle}>Interactive Buttons with Roles</Text>
      <Button
        accessibilityState={
          interactiveExpanded ? {expanded: true} : {expanded: false}
        }
        onPress={() => setInteractiveExpanded(prev => !prev)}
        title={
          interactiveExpanded
            ? 'Collapse Interactive Buttons'
            : 'Expand Interactive Buttons'
        }
      />
      {interactiveExpanded &&
        roles.map(role => (
          <View
            key={role}
            accessibilityRole={role as AccessibilityRole}
            style={styles.button}>
            <Button
              title={role}
              color="#0000FF"
              onPress={() => console.log(`${role} pressed`)}
            />
          </View>
        ))}
      <Text style={styles.sectionTitle}>Non-Interactive Views with Roles</Text>
      <Button
        accessibilityState={
          nonInteractiveExpanded ? {expanded: true} : {expanded: false}
        }
        onPress={() => setNonInteractiveExpanded(prev => !prev)}
        title={
          nonInteractiveExpanded
            ? 'Collapse Non-Interactive Views'
            : 'Expand Non-Interactive Views'
        }
      />
      {nonInteractiveExpanded &&
        roles.map(role => (
          <View
            key={role}
            accessibilityRole={role as AccessibilityRole}
            accessible
            style={styles.button}>
            <Text style={styles.text}>{role}</Text>
          </View>
        ))}
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
  },
  text: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    padding: 15,
  },
});

export default AccessibilityRolesScreen;
