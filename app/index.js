/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';

export default function Main() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000',
      accent: '#f1c40f',
      background: '#fff',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <App theme={theme} />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
