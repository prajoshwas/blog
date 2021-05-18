import React, {useState} from 'react';
import {Button, Screen, Text} from 'components';
import {Alert, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {
  checkUserInfo,
  signInWithGoogle,
  addNewUser,
} from '../../utils/apiRoutes';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default props => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoad] = useState(false);
  const [disabledBtns, setDisabled] = useState(false);
  const regex = /^\s*$/;

  const showAlert = (message, title = 'Oops!') => {
    Alert.alert(title, message, [{}]);
  };
  const Login = async () => {
    setLoading(true);

    if (
      !username ||
      !password ||
      regex.test(username) ||
      regex.test(password)
    ) {
      setLoading(false);
      setDisabled(false);
      return showAlert('Please enter username and password');
    } else {
      try {
        let payload = {
          username: username,
          password: password,
        };
        let response = await checkUserInfo(payload);
        if (response.isError) {
          throw response;
        }
        navigation.navigate('Home');
        setLoading(false);
        setDisabled(false);
      } catch (error) {
        setLoading(false);
        showAlert(error.message);
      }
    }
  };

  const signin = async () => {
    setGoogleLoad(true);
    setDisabled(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        let payload = {
          email: userInfo.user.email,
        };
        let response = await signInWithGoogle(payload);
        if (response.isError) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          throw response;
        } else {
          if (response.message === 'Record Not found') {
            payload.isGmail = 1;
            let newResponse = await addNewUser(payload);
            if (newResponse.data.message === 'Successfully saved') {
              navigation.navigate('Main', userInfo);
            }
          } else {
            navigation.navigate('Main', userInfo);
          }
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        showAlert('Google Play Services is required to login to the app.');
      } else {
        showAlert(error.message);
      }
    }
    setGoogleLoad(false);
    setDisabled(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const init = async () => {
        try {
          const isSignedIn = await GoogleSignin.isSignedIn();
          if (isSignedIn) {
            const currentUser = await GoogleSignin.getCurrentUser();
            if (currentUser) {
              let payload = {
                email: currentUser.user.email,
              };
              let response = await signInWithGoogle(payload);
              if (response.isError) {
                throw response;
              } else if (response.isNew) {
                //when user has an existing session but data is deleted from database
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                showAlert(
                  'You have been logged out. Please sign in again to continue',
                );
                SplashScreen.hide();
              } else {
                navigation.navigate('Main', currentUser);
              }
            }
          } else {
            SplashScreen.hide();
          }
        } catch (error) {
          showAlert(error.message);
        }
      };
      GoogleSignin.configure();
      init();
    }, [navigation]),
  );

  return (
    <Screen style={styles.layout}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text center lg style={styles.title}>
          Login
        </Text>
      </View>
      <View style={styles.inputContainerStyle}>
        <TextInput
          label="Username / Email"
          mode={'outlined'}
          disabled={false}
          value={username}
          autoCapitalize="none"
          onChangeText={val => setUsername(val)}
        />
      </View>
      <View style={styles.inputContainerStyle}>
        <TextInput
          label="Password"
          mode={'outlined'}
          secureTextEntry={visible}
          disabled={false}
          value={password}
          autoCapitalize="none"
          onChangeText={val => setPassword(val)}
          right={
            <TextInput.Icon
              name={visible ? 'eye-off' : 'eye'}
              style={styles.iconStyle}
              size={30}
              onPress={() => setVisible(!visible)}
            />
          }
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <Button
          color={'#000'}
          mode={'contained'}
          onPress={Login}
          loading={isLoading}
          style={styles.loginBtnStyle}
          disabled={disabledBtns ? true : isLoading ? true : false}
          contentStyle={styles.innerBtnStyle}>
          {'Login'}
        </Button>
      </View>
      <View style={styles.googleSignInContainer}>
        <Text center lg b>
          {'or'}
        </Text>
      </View>
      <View style={styles.googleSignInContainer}>
        <GoogleSigninButton
          style={styles.googleSignInStyle}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
          disabled={disabledBtns ? true : isGoogleLoading ? true : false}
        />
      </View>
      <View style={styles.forgotPassContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={styles.touchableBtnStyle}>
          <Text sm style={styles.forgotPassStyle}>
            {'Forgot Password?'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainerStyle}>
        <Text md center>
          {'New User? Sign Up '}
          <Text
            md
            center
            style={styles.touchableTxtStyle}
            onPress={() => navigation.navigate('Signup')}>
            {'Here'}
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    paddingBottom: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 145,
    height: 150,
  },
  layout: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  inputContainerStyle: {
    padding: 10,
    fontSize: 22,
  },
  passwordContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnStyle: {
    alignSelf: 'stretch',
  },
  googleSignInContainer: {
    alignItems: 'center',
    padding: 10,
  },
  googleSignInStyle: {
    width: 340,
    height: 60,
  },
  innerBtnStyle: {
    height: 50,
  },
  forgotPassContainer: {
    alignItems: 'center',
    padding: 10,
  },
  loginBtnContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  iconStyle: {
    marginTop: 10,
    marginRight: 25,
  },
  touchableBtnStyle: {
    alignItems: 'center',
    padding: 10,
  },
  forgotPassStyle: {
    fontStyle: 'italic',
  },
  touchableTxtStyle: {
    textDecorationLine: 'underline',
  },
});
