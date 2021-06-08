import React, {useState, useContext} from 'react';
import {
  View,
  BackHandler,
  Alert,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {FAB, Text, ListItem} from 'components';
import {useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Appbar} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {getAllBlogs, likeBlogs} from '../../../utils/apiRoutes';
import actions from '../../../utils/contextAPI/action-types';
import {Store} from '../../../utils/contextAPI/store';

export default props => {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewIndex, setIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  let {state, dispatch} = useContext(Store);

  const getNewData = async () => {
    setLoading(true);
    let response = await getAllBlogs(dispatch);
    let contextPayload = {
      type: actions.SAVE_BLOGS,
      payload: response.data,
    };
    dispatch(contextPayload);
    setLoading(false);
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
      }, 1000);

      const init = async () => {
        setLoading(true);
        let response = await getAllBlogs(dispatch);
        let contextPayload = {
          type: actions.SAVE_BLOGS,
          payload: response.data,
        };
        dispatch(contextPayload);
        setLoading(false);
      };

      init();
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [dispatch]),
  );

  const likeCurrentBlog = id => {
    likeBlogs(id, dispatch);
  };

  const toggleNumberLines = index => {
    if (viewIndex === index) {
      setExpanded(false);
      setIndex(-1);
      return;
    }
    setExpanded(true);
    setIndex(index);
  };
  const renderCustomItem = ({item, index}) => {
    return (
        <ListItem blog={item} index={index} 
          toggleLines={toggleNumberLines} 
          likeBlog={likeCurrentBlog} 
          viewIndex={viewIndex}
          expanded={expanded}/>
      );
  };

  return (
    <View style={styles.screen}>
      <Appbar style={styles.bottom}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      </Appbar>
      {!state.blogs && (
        <>
          <View style={{marginTop: 150, flex: 1}}>
            <LottieView
              source={require('../../../assets/lottie-animations/53207-empty-file.json')}
              autoPlay={true}
              loop={true}
              style={styles.lottieLoadingStyle}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={styles.error} b>
              {"Can't Find Anything Yet"}
            </Text>
          </View>
        </>
      )}
      <FlatList
        data={state.blogs}
        style={{alignSelf: 'stretch', position: 'relative'}}
        renderItem={renderCustomItem}
        numColumns={1}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        keyExtractor={(item, index) => index}
        refreshing={isLoading}
        onRefresh={() => getNewData}
        initialNumToRender={5}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={{backgroundColor: '#FFF'}}>
        <View>
          <Text>HELLO WORLD</Text>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        icon={'plus-circle'}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieLoadingStyle: {
    height: 350,
    padding: 0,
    margin: 0,
    alignSelf: 'center',
  },
  screen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cardStyle: {
    backgroundColor: '#d2d2d2',
    alignSelf: 'stretch',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  error: {
    fontFamily: 'Coconutz-EaZjl',
    fontSize: 28,
    justifyContent: 'center',
    textAlign: 'center',
  },
  bottom: {
    position: 'relative',
    alignSelf: 'stretch',
    left: 0,
    right: 0,
    top: 0,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 1,
  }
});
