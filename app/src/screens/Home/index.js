import React, {useState} from 'react';
import {View, Text, BackHandler, Alert, StyleSheet} from 'react-native';
import {LoadingScreen, Screen} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

export default props => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState('');

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
        SplashScreen.hide();
        setLoading(false);
      }, 1000);
      setData(null);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return !data? ( 
    <View style={styles.screen}>
      <LottieView
        source={require('../../assets/lottie-animations/53207-empty-file.json')}
        autoPlay={true}
        loop={true}
        style={styles.lottieLoadingStyle} />
      <View>
        <Text style={styles.error} b>Can't Find Anything Yet  =(</Text>
      </View>
    </View>  
  ) : 
    <View>
      <Text>Hello World</Text>
    </View>
};

const styles = StyleSheet.create({
  lottieLoadingStyle:{
    width: 400,
    height: 500,
    padding: 0,
    margin: 0,
  },
  screen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  error: {
    fontSize: 24,
  },
});