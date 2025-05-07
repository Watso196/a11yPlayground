import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  AccessibilityRole,
  Pressable,
} from 'react-native';
import styles from '../styles/commonStyles';

const roles = [
  'adjustable',
  'alert',
  'button',
  'checkbox',
  'combobox',
  'grid',
  'header',
  'image',
  'imagebutton',
  'keyboardkey',
  'link',
  'list',
  'menu',
  'menubar',
  'menuitem',
  'none',
  'progressbar',
  'radio',
  'radiogroup',
  'scrollbar',
  'search',
  'spinbutton',
  'summary',
  'switch',
  'tab',
  'tablist',
  'text',
  'timer',
  'togglebutton',
  'toolbar',
];

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
          <Pressable
            key={role}
            onPress={() => {}} //empty press interaction to make sure AAPI picks this up as interactive
            accessible
            accessibilityLabel={role}
            accessibilityRole={role as AccessibilityRole}
            style={styles.button}>
            <Text>{role}</Text>
          </Pressable>
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

export default AccessibilityRolesScreen;
