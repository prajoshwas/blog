import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Login, Signup, Drawer} from 'screens';
import {LogBox} from 'react-native';
import {StoreProvider} from './utils/contextAPI/store';
LogBox.ignoreLogs(['Reanimated 2']);

const App = props => {
  const Stack = createStackNavigator();
  const noHeaderOptions = {
    headerShown: false,
  };

  return (
    <StoreProvider>
      <NavigationContainer theme={props.theme}>
        <Stack.Navigator
          initialRouteName={'Login'}
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name={'Login'}
            component={Login}
            options={noHeaderOptions}
          />
          <Stack.Screen
            name={'Drawer'}
            component={Drawer}
            options={noHeaderOptions}
          />
          <Stack.Screen
            name={'Signup'}
            component={Signup}
            options={noHeaderOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
