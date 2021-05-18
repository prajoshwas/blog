import * as React from 'react';
import {Spinner} from 'components';
import {View, StyleSheet, StatusBar} from 'react-native';

export default props => {
  return (
    <View style={styles.screen}>
      <Spinner />
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
});
