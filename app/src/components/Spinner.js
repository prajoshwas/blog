import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export default ({sm, lg, size = 50}) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={sm ? 18 : lg ? 30 : size} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
