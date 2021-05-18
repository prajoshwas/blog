import React, {useState} from 'react';
import {View, Text, BackHandler, Alert} from 'react-native';
import {LoadingScreen} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default props => {
  const [isLoading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Wait!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        SplashScreen.hide();
      }, 1000);

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};
