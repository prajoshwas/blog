import React, {useState} from 'react';
import {
  View,
  BackHandler,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import {LoadingScreen} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {Icon, Screen, Button, TextInput, FAB, Text} from 'components';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SplashScreen from 'react-native-splash-screen';

export default props => {
  const [isLoading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(props.route.params.givenName);
  const [lastName, setLastName] = useState(props.route.params.familyName);
  const [email, setEmail] = useState(props.route.params.email);
  const [username, setUsername] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [photo, setPhoto] = useState(props.route.params.photo);
  const [fabIcon, setFabIcon] = useState('account-edit');
  const [dialogVisible, setVisible] = useState(false);

  const options = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    quality: 1,
    cameraType: 'front',
    includeBase64: true,
  };
  const showAlert = (message, title = 'Oops!') => {
    Alert.alert(title, message, [{}]);
  };

  const fabOnClick = () => {
    setDisabled(!disabled);
    if (fabIcon === 'content-save') {
      setFabIcon('account-edit');
    } else {
      setFabIcon('content-save');
    }
  };
  const addPhoto = async () => {
    let response = await request(PERMISSIONS.ANDROID.CAMERA);
    if (
      response === RESULTS.UNAVAILABLE ||
      response === RESULTS.DENIED ||
      response === RESULTS.BLOCKED
    ) {
      showAlert('Camera access is required for this feature');
      return;
    }
    setVisible(true);
  };

  const takeCamera = async () => {
    setVisible(false);
    launchCamera(options, handlePhoto);
  };

  const selectFromGallery = async () => {
    setVisible(false);
    launchImageLibrary(options, handlePhoto);
  };

  const handlePhoto = response => {
    if (response.didCancel) {
      return;
    }
    let image = 'data:image/png;base64,' + response.base64;
    setPhoto(image);
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
    <Screen style={styles.layout}>
      <ScrollView style={styles.scViewStyle}>
        <View style={styles.imageStyle}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.image} />
          ) : (
            <Icon type="fa" name="user-circle" size={164} />
          )}
        </View>
        <View style={styles.buttonContainerStyle}>
          <Button
            color={'#000'}
            mode={'contained'}
            onPress={addPhoto}
            style={styles.addBtnStyle}>
            {photo ? 'Change' : 'Add'}
          </Button>
          <Portal>
            <Dialog visible={dialogVisible} onDismiss={() => setVisible(false)}>
              <Dialog.Title>Hey!</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  To add picture, please select from options below
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={takeCamera}>Take a Selfie</Button>
                <Button onPress={selectFromGallery}>Select from Gallery</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View style={styles.fieldsContainer}>
          <View style={styles.labelContainerStyle}>
            <Text style={styles.labelStyle}>{'Personal Info'}</Text>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Email"
              mode={'flat'}
              disabled={disabled}
              value={email}
              autoCapitalize="none"
              onChangeText={val => setEmail(val)}
              style={styles.inputBgStyle}
            />
          </View>
          <View style={styles.nameContainerStyle}>
            <View style={styles.inputWrap}>
              <TextInput
                label="First Name"
                mode={'flat'}
                disabled={disabled}
                value={firstName}
                autoCapitalize="none"
                onChangeText={val => setFirstName(val)}
                style={styles.namesInputStyle}
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                label="Last Name"
                mode={'flat'}
                disabled={disabled}
                value={lastName}
                autoCapitalize="none"
                onChangeText={val => setLastName(val)}
                style={styles.namesInputStyle}
              />
            </View>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Username"
              mode={'flat'}
              disabled={disabled}
              value={username}
              autoCapitalize="none"
              onChangeText={val => setUsername(val)}
              style={styles.inputBgStyle}
            />
          </View>
        </View>
      </ScrollView>
      <FAB style={styles.fab} icon={fabIcon} onPress={fabOnClick} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  addBtnStyle: {
    width: 150,
    alignContent: 'center',
    alignSelf: 'center',
  },
  labelContainerStyle: {
    paddingTop: 10,
  },
  scViewStyle: {
    marginTop: StatusBar.currentHeight,
  },
  fieldsContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  labelStyle: {
    fontSize: 20,
  },
  namesInputStyle: {
    backgroundColor: '#FFF',
  },
  inputWrap: {
    flex: 1,
    paddingHorizontal: 5,
  },
  nameContainerStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageStyle: {
    alignItems: 'center',
  },
  buttonContainerStyle: {
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  inputBgStyle: {
    backgroundColor: '#FFF',
  },
  inputContainerStyle: {
    marginTop: 10,
    padding: 5,
  },
});
