import React from 'react';
import {View} from 'react-native';

export default props => {
  let style = {},
    size = 10;

  if (props.xs) {
    size = 3;
  } else if (props.sm) {
    size = 5;
  } else if (props.md) {
    size = 15;
  } else if (props.lg) {
    size = 25;
  } else if (props.xl) {
    size = 35;
  }

  if (props.h) {
    style.marginHorizontal = size;
  } else {
    style.marginVertical = size;
  }

  return <View style={style} />;
};
