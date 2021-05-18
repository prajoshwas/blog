import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Login, Signup, Main} from 'screens';

const App = props => {
  const Stack = createStackNavigator();
  const noHeaderOptions = {
    headerShown: false,
  };
  return (
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
          name={'Main'}
          component={Main}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={'Signup'}
          component={Signup}
          options={noHeaderOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
