import React from 'react';
import {Text} from 'react-native-paper';

export default props => {
  let style = {
    color: '#000',
  };

  if (props.center) {
    style.textAlign = 'center';
  } else if (props.right) {
    style.textAlign = 'right';
  } else {
    style.textAlign = 'left';
  }

  if (props.lg) {
    style.fontSize = 22;
  } else if (props.md) {
    style.fontSize = 18;
  } else if (props.sm) {
    style.fontSize = 16;
  }

  if (props.b) {
    style.fontWeight = '700';
  }
  return (
    <Text {...props} style={{...style, ...props.style}}>
      {props.children}
    </Text>
  );
};
