import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScrollView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AccessibilityRoles from './screens/AccessibilityRoles';
import CommonComponentsScreen from './screens/CommonComponents';

// Static page content as its own screen component
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

function App(): React.JSX.Element {
  // Create the drawer navigator
  const Drawer = createDrawerNavigator();

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Navigation container and drawer */}
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            drawerType: 'front',
            overlayColor: 'blue',
            drawerPosition: 'left',
          }}>
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
          <Drawer.Screen
            name="Accessibility Roles"
            component={AccessibilityRoles}
          />
          <Drawer.Screen
            name="Common Components"
            component={CommonComponentsScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
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

export default App;
