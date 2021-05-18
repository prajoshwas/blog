import * as React from 'react';
import {Button} from 'react-native-paper';

export default props => {
  return <Button {...props}> {props.children} </Button>;
};
