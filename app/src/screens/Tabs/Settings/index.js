import React from 'react';
import {View, BackHandler, Alert, StyleSheet} from 'react-native';
import {Button} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default props => {
  const {navigation} = props;
  const logout = async () => {
    Alert.alert('Wait!', 'Are you sure you want to log out?', [
      {text: 'Cancel', onPress: () => null, style: 'cancel'},
      {
        text: 'Yes',
        onPress: removeAccessAndPhoto,
      },
    ]);
  };

  const removeAccessAndPhoto = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('profilePicture');
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

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return (
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
