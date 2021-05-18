import React, {useState} from 'react';
import {View, BackHandler, Alert, StyleSheet} from 'react-native';
import {LoadingScreen, Button} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default props => {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(false);
  const logout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    navigation.navigate('Login');
  };
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
      <View style={styles.logoutContainer}>
        <Button
          color={'#f44336'}
          mode={'contained'}
          onPress={logout}
          style={styles.logoutBtnStyle}>
          {'Logout'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutBtnStyle: {
    alignSelf: 'stretch',
    height: 40,
  },
  logoutContainer: {
    paddingVertical: 10,
  },
});
