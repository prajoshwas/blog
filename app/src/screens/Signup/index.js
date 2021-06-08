import React, {useState} from 'react';
import {Button, Screen, Text} from 'components';
import {Alert, StyleSheet, View, ScrollView, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {checkUser, addNewUser} from '../../utils/apiRoutes';

export default props => {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const regex = /^\s*$/;
  const showAlert = (message, title = 'Oops!') => {
    Alert.alert(title, message, [{}]);
  };
  const signup = async () => {
    setLoading(true);
    if (!username || regex.test(username)) {
      setLoading(false);
      return showAlert('Please complete the fields to continue');
    } else {
      try {
        setLoading(true);
        let payload = {
          username: username,
          password: password,
          email: email,
        };
        let user = await checkUser(payload);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showAlert(error.message);
      }
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      // if cancelled
      setShow(false);
    } else {
      //if set
      setShow(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {}, 500);
    }, []),
  );

  return (
    <Screen style={styles.layout}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.layout}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text center lg style={styles.title}>
            {'Sign up for a free account'}
          </Text>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Username"
            mode={'outlined'}
            disabled={false}
            value={username}
            autoCapitalize="none"
            onChangeText={val => setUsername(val)}
            left={<TextInput.Icon name="face" size={30} color={'#000'} />}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Password"
            mode={'outlined'}
            disabled={false}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
            left={<TextInput.Icon name="lock" color={'#000'} />}
          />
          {/*   <TextInput
            label="Birthday"
            mode={'outlined'}
            disabled={false}
            value={birthday}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                name={'calendar'}
                style={styles.iconStyle}
                size={30}
                onPress={showDatePicker}
              />
            }
          /> */}
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label="Email"
            mode={'outlined'}
            disabled={false}
            value={email}
            autoCapitalize="none"
            onChangeText={val => setEmail(val)}
            left={<TextInput.Icon name="email" size={30} color={'#000'} />}
          />
        </View>
        <View style={styles.loginBtnContainer}>
          <Button
            color={'#000'}
            mode={'contained'}
            onPress={signup}
            loading={isLoading}
            style={styles.loginBtnStyle}
            contentStyle={styles.innerBtnStyle}>
            {'Signup'}
          </Button>
        </View>
        {show && (
          <DateTimePicker
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
            maximumDate={Date.now()}
          />
        )}
      </ScrollView>
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
    fontSize: 24,
    paddingBottom: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 150,
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
  orStyle: {
    fontStyle: 'normal',
  },
  passwordContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnStyle: {
    alignSelf: 'stretch',
  },
  innerBtnStyle: {
    height: 50,
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
