import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Tabs, About} from 'screens';
import {StyleSheet} from 'react-native';
import {Colors} from 'constants';

const Drawer = createDrawerNavigator();
export default props => {
  return (
    <Drawer.Navigator
      drawerStyle={styles.drawerBg}
      drawerType="slide"
      drawerContentOptions={{
        activeTintColor: Colors.gray,
        inactiveTintColor: Colors.white,
      }}>
      <Drawer.Screen
        name="Home"
        component={Tabs}
        initialParams={props.route.params?.user}
      />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerBg: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
});
