import React, {useState} from 'react';
import {Button, Screen, Text} from 'components';
import {Alert, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default props => {
  //const {navigation} = props;
  const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  //const [visible, setVisible] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const regex = /^\s*$/;
  const showAlert = (message, title = 'Oops!') => {
    Alert.alert(title, message, [{}]);
  };
  const Login = async () => {
    setLoading(true);
    if (!username || regex.test(username)) {
      setLoading(false);
      return showAlert('Please enter username and password');
    } else {
      try {
        /*   let payload = {
          username: username,
          password: password,
        }; */

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
      setBirthday(selectedDate.toLocaleDateString());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {}, 500);
    }, []),
  );

  return (
    <Screen style={styles.layout}>
      <View style={styles.titleContainer}>
        <Text center lg style={styles.title}>
          {'Sign up for an account'}
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
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <Button
          color={'#000'}
          mode={'contained'}
          onPress={Login}
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
