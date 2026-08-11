import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, Platform, NativeModules} from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import styles from './styles/commonStyles';

type MaybeState = NavigationState | PartialState<NavigationState>;

function getActiveRouteName(state?: MaybeState): string | undefined {
  if (!state || !state.routes || state.routes.length === 0) {
    return undefined;
  }

  const index = state.index ?? 0;
  const route = state.routes[index] as {
    name?: string;
    state?: MaybeState;
  };

  if (route.state) {
    return getActiveRouteName(route.state) ?? route.name;
  }

  return route.name;
}

function App(): React.JSX.Element {
  const [activeRouteName, setActiveRouteName] = React.useState<string | undefined>(
    undefined,
  );

  const showGlobalLiquidTabBar = Platform.OS === 'ios' && activeRouteName === 'Liquid Glass Tab Bar';

  React.useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    const module = NativeModules.NativeBarModule as
      | {setLiquidGlassTabBarHidden?: (hidden: boolean, animated: boolean) => void}
      | undefined;
    module?.setLiquidGlassTabBarHidden?.(!showGlobalLiquidTabBar, true);
  }, [showGlobalLiquidTabBar]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        onReady={state => {
          setActiveRouteName(getActiveRouteName(state));
        }}
        onStateChange={state => {
          setActiveRouteName(getActiveRouteName(state));
        }}>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

