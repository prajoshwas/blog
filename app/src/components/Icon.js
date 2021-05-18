import React from 'react';
import {View} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const Icon = ({name, color, size, type, style}) => {
  let renderIcon = () => {
    switch (type) {
      case 'ad':
        return <AntDesign {...{name, size: size, color}} />;
      case 'en':
        return <Entypo {...{name, size: size, color}} />;
      case 'ev':
        return <EvilIcons {...{name, size: size, color}} />;
      case 'fr':
        return <Feather {...{name, size: size, color}} />;
      case 'fa':
        return <FontAwesome {...{name, size: size, color}} />;
      case 'ft':
        return <Fontisto {...{name, size: size, color}} />;
      case 'fd':
        return <Foundation {...{name, size: size, color}} />;
      case 'mi':
        return <MaterialIcons {...{name, size: size, color}} />;
      case 'mdi':
        return <MaterialCommunityIcons {...{name, size: size, color}} />;
      case 'oc':
        return <Octicons {...{name, size: size, color}} />;
      case 'zo':
        return <Zocial {...{name, size: size, color}} />;
      case 'sp':
        return <SimpleLineIcons {...{name, size: size, color}} />;

      default:
        return <Ionicon {...{name, size: size, color}} />;
    }
  };

  return <View style={style}>{renderIcon()}</View>;
};

export default Icon;
