import React from 'react';
import reducer from './reducer';
import mods from './data/mods';

const defaultState = {
  mods,
  menu: {
    active: true,
    selected: [],
    filtered: [],
    id: '',
  },
  combinations: [],
  needed: {
    all: [],
    unassigned: [],
    assigned: [],
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
