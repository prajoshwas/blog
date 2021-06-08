import React, {useState} from 'react';
import {View, BackHandler, Alert, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'components';
import {Appbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default props => {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(false);
  const logout = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    Alert.alert('Wait!', 'Are you sure you want to log out?', [
      {text: 'Cancel', onPress: () => null, style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
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
    <View style={styles.screen}>
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      </Appbar>
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
  screen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logoutBtnStyle: {
    alignSelf: 'stretch',
    height: 40,
  },
  logoutContainer: {
    paddingTop: 120,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
