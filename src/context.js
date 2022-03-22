import React from 'react';
import reducer from './reducer';
import mods from './data/mods';

const defaultState = {
  mods,
  menu: {
    mod: {
      active: true,
      selected: [],
      filtered: [],
      id: '',
    },
    owned: {
      active: false,
      filtered: [],
    },
  },
  explorer: {
    combination: {},
  },
  combinations: [],
  items: {
    needed: [],
    unassigned: [],
    owned: [],
  },
};

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
