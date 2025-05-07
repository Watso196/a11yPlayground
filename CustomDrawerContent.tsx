import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';
import styles from './styles/commonStyles';

export default function CustomDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const drawerStatus = useDrawerStatus();
  const isDrawerOpen = drawerStatus === 'open';
  const firstItemRef = useRef<React.ElementRef<typeof Pressable>>(null);

  useEffect(() => {
    if (isDrawerOpen && firstItemRef.current) {
      const node = findNodeHandle(firstItemRef.current);
      if (node) {
        AccessibilityInfo.setAccessibilityFocus(node);
      }
    }
  }, [isDrawerOpen]);

  return (
    <View
      accessibilityViewIsModal={isDrawerOpen}
      accessibilityElementsHidden={!isDrawerOpen}
      style={styles.drawerContainer}>
      {/* Close Menu button */}
      <Pressable
        style={styles.closeButton}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Close navigation menu"
        onPress={() => navigation.closeDrawer()}>
        <Text style={styles.closeButtonText}>Close Menu</Text>
      </Pressable>

      <Pressable
        ref={firstItemRef}
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Accessibility Actions')}>
        <Text>Accessibility Actions</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Accessibility Roles')}>
        <Text>Accessibility Roles</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Common Components')}>
        <Text>Common Components</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Custom Component Patterns')}>
        <Text>Custom Component Patterns</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessibilityRole="button"
        onPress={() => navigation.navigate('Custom Gestures')}>
        <Text>Custom Gestures</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Dynamic Content Announcements')}>
        <Text>Dynamic Content Announcements</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Focus Control')}>
        <Text>Focus Control</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Motion Reduction')}>
        <Text>Motion Reduction</Text>
      </Pressable>

      <Pressable
        style={{marginBottom: 20}}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('States and Values')}>
        <Text>States and Values</Text>
      </Pressable>
    </View>
  );
}
