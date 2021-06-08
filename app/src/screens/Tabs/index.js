import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'components';
import {Home, Profile, Settings} from 'screens';
import Appbar from '../../components/Appbar';

export default props => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Blogs"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName, type;
          if (route.name === 'Blogs') {
            iconName = focused ? 'newspaper-variant' : 'newspaper';
            type = 'mdi';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-circle-o' : 'user-circle';
            type = 'fa';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
            type = focused ? 'fa' : 'ev';
          }
          // You can return any component that you like here!
          return <Icon type={type} name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#000',
        },
      }}>
      <Tab.Screen name="Blogs" component={Home} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={props.route.params}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
