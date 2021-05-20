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
import {
  Paragraph,
  Dialog,
  Portal,
  TextInput as CustomTextInput,
} from 'react-native-paper';
import {Icon, Screen, Button, TextInput, FAB, Text, Spacer} from 'components';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default props => {
  
  const [firstName, setFirstName] = useState(props.route.params?.givenName);
  const [lastName, setLastName] = useState(props.route.params?.familyName);
  const [email, setEmail] = useState(props.route.params?.email);
  const [username, setUsername] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [photo, setPhoto] = useState(props.route.params?.photo);
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

  const links = [
    {
      name: 'facebook-messenger',
      type: 'mdi',
      label: 'messenger',
      id: 1,
      color: '#006AFF',
    },
    {
      name: 'twitter',
      type: 'mdi',
      label: 'twitter',
      id: 2,
      color: '#1DA1F2',
    },
    {
      name: 'instagram',
      type: 'mdi',
      label: 'instagram',
      id: 3,
      color: '#F56040',
    },
  ];

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

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  return (
    <Screen style={styles.layout}>
      <ScrollView
        style={styles.scViewStyle}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never">
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
            <Text style={styles.labelStyle} b>
              {'Personal Info'}
            </Text>
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
        <View style={styles.fieldsContainer}>
          <Text style={styles.labelStyle} b>
            Social Media Links
          </Text>
          {links.map((item, idx) => (
            <View key={item.id} style={styles.linkStyle}>
              <View>
                <CustomTextInput
                  label={item.label}
                  mode={'flat'}
                  disabled={disabled}
                  autoCapitalize="none"
                  style={styles.namesInputStyle}
                  left={
                    <CustomTextInput.Icon
                      name={item.name}
                      size={34}
                      color={item.color}
                    />
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Spacer md />
      <FAB style={styles.fab} icon={fabIcon} onPress={fabOnClick} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linkStyle: {
    padding: 10,
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
    padding: 15,
    marginTop: 5,
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
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imageStyle: {
    alignItems: 'center',
  },
  buttonContainerStyle: {
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 20,
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
