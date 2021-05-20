import * as React from 'react';

import {View, StyleSheet, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

export default props => {
  return (
    <View style={styles.screen}>
      <LottieView
          source={require('../assets/lottie-animations/62329-loading-drops.json')}
          autoPlay={true}
          loop={true}
          speed={1.5}
          style={styles.lottieLoadingStyle}/>
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
    paddingTop: StatusBar.currentHeight,
  },
  lottieLoadingStyle:{
    width: 200,
    height: 300,
  }
});
