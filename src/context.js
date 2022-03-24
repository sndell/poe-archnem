import React from 'react';
import reducer from './reducer';
import mods from './data/mods';

const defaultState = {
  mods,
  explorer: {},
  menu: {
    mod: {
      active: false,
      selected: [],
      highlighted: [],
      id: '',
    },
    owned: {
      active: false,
      highlighted: [],
    },
  },
  combinations: JSON.parse(window.localStorage.getItem('combinations')) || [],
  items: JSON.parse(window.localStorage.getItem('items')) || {
    owned: [{ imgName: 'vamperic.png', name: 'Vamperic', amount: 3 }],
    needed: [],
  },
  refresh: false,
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
