import React from 'react';
import {Appbar} from 'react-native-paper';
export default ({navigation}) => {
  return (
    <Appbar>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
    </Appbar>
  );
};
