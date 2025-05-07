import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AccessibilityRolesScreen from './screens/AccessibilityRoles';
import CommonComponentsScreen from './screens/CommonComponents';
import StatesAndValuesScreen from './screens/StatesAndValues';
import CustomGesturesScreen from './screens/CustomGestures';
import CustomDrawerContent from './CustomDrawerContent';
import CustomComponentsScreen from './screens/CustomComponents';
import DynamicContentAnnouncementsScreen from './screens/DynamicContentAnnouncements';
import AccessibilityActionsScreen from './screens/AccessibilityActions';
import FocusControlScreen from './screens/FocusControl';
import MotionReductionScreen from './screens/MotionReduction';
import {ScrollView, Text} from 'react-native';
import styles from './styles/commonStyles';

const Drawer = createDrawerNavigator();

function WelcomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>
        Welcome to the Accessibility Playground Testing App!
      </Text>
      <Text style={styles.text}>
        This is where we can learn React Native, and test React Native code on
        mobile devices.
      </Text>
      <Text style={styles.text}>
        This playground acts as a repository of basic test cases for
        accessibility engineers to test against, and keep up to date with
        changes to mobile technology expectations.
      </Text>
    </ScrollView>
  );
}

const DrawerContent = (props: any) => <CustomDrawerContent {...props} />;

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'front',
        overlayColor: 'blue',
        drawerPosition: 'left',
      }}
      drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={WelcomeScreen} />

      <Drawer.Screen
        name="Accessibility Actions"
        component={AccessibilityActionsScreen}
      />

      <Drawer.Screen
        name="Accessibility Roles"
        component={AccessibilityRolesScreen}
      />

      <Drawer.Screen
        name="Common Components"
        component={CommonComponentsScreen}
      />

      <Drawer.Screen
        name="Custom Component Patterns"
        component={CustomComponentsScreen}
      />

      <Drawer.Screen name="Custom Gestures" component={CustomGesturesScreen} />

      <Drawer.Screen
        name="Dynamic Content Announcements"
        component={DynamicContentAnnouncementsScreen}
      />

      <Drawer.Screen name="Focus Control" component={FocusControlScreen} />

      <Drawer.Screen
        name="Motion Reduction"
        component={MotionReductionScreen}
      />

      <Drawer.Screen
        name="States and Values"
        component={StatesAndValuesScreen}
      />
    </Drawer.Navigator>
  );
}
