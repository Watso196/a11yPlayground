import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AccessibilityRoles from './screens/AccessibilityRoles';
import CommonComponentsScreen from './screens/CommonComponents';
import StatesAndValuesScreen from './screens/StatesAndValues';
import CustomGesturesScreen from './screens/CustomGestures';
import CustomDrawerContent from './CustomDrawerContent';
import {ScrollView, Text, StyleSheet} from 'react-native';

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

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        drawerType: 'front',
        overlayColor: 'blue',
        drawerPosition: 'left',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen
        name="Accessibility Roles"
        component={AccessibilityRoles}
      />
      <Drawer.Screen
        name="Common Components"
        component={CommonComponentsScreen}
      />
      <Drawer.Screen
        name="Accessibility States and Values"
        component={StatesAndValuesScreen}
      />
      <Drawer.Screen name="Custom Gestures" component={CustomGesturesScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  text: {
    padding: 15,
  },
});
