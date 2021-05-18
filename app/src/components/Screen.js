import React from 'react';
import {View, SafeAreaView, Platform, StatusBar} from 'react-native';

const styles = {
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 40,
  },
};

export default React.memo(props => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView style={props.style}>{props.children}</SafeAreaView>;
  }

  return <View style={[styles.container, props.style]}>{props.children}</View>;
});
