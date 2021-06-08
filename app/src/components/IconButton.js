import * as React from 'react';
import {IconButton} from 'react-native-paper';

export default props => {
  return (
    <IconButton
      icon={props.icon}
      color={props.color}
      size={props.size}
      onPress={props.onPress}
    />
  );
};
