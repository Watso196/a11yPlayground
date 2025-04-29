import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  AccessibilityInfo,
  findNodeHandle,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentComponentProps,
  useDrawerStatus,
} from '@react-navigation/drawer';

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
        style={styles.item}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Welcome')}>
        <Text>Welcome</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Accessibility Roles')}>
        <Text>Accessibility Roles</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Common Components')}>
        <Text>Common Components</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        accessible
        accessibilityRole="button"
        onPress={() => navigation.navigate('Accessibility States and Values')}>
        <Text>States and Values</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        accessibilityRole="button"
        onPress={() => navigation.navigate('Custom Gestures')}>
        <Text>Custom Gestures</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  closeButton: {
    marginBottom: 30,
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  item: {
    marginBottom: 20,
  },
});
