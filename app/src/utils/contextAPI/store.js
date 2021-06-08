import React, {useReducer} from 'react';
import initialState from './initialState';
import reducer from './reducer';

export const Store = React.createContext();
export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};
