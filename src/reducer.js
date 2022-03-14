const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_NEW': {
      return {
        ...state,
        menu: {
          ...state.menu,
          active: true,
          mode: 'create',
          selected: [],
        },
      };
    }
    case 'MENU_SELECT': {
      return {
        ...state,
        menu: {
          ...state.menu,
          selected: [...state.menu.selected, action.payload],
        },
      };
    }
    case 'MENU_DESELECT': {
      return {
        ...state,
        menu: {
          ...state.menu,
          selected: state.menu.selected.filter(
            (item) => item !== action.payload
          ),
        },
      };
    }
    case 'MENU_CLOSE': {
      return {
        ...state,
        menu: {
          ...state.menu,
          active: false,
          mode: '',
          selected: [],
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
