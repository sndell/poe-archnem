import React from 'react';
import reducer from './reducer';
import mods from './data/mods';

const defaultState = {
  mods,
  menu: {
    mod: {
      active: false,
      selected: [],
      filtered: [],
      id: '',
    },
    owned: {
      active: true,
      filtered: [],
    },
  },
  combinations: [],
  items: {
    needed: [],
    unassigned: [],
    assigned: [],
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
