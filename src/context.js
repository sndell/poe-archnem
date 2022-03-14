import React from 'react';
import reducer from './reducer';

const defaultState = {};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const GlobalContext = () => React.useContext(AppContext);

export { AppProvider, GlobalContext };
