const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_SET-MOD': {
      return {
        ...state,
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            active: action.payload.active,
            highlighted: [],
            selected: action.payload.selected,
            id: action.payload.id,
          },
        },
      };
    }
    case 'MENU_SET-MOD-HIGHLIGHTED': {
      console.log(action.payload);
      return {
        ...state,
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            highlighted: action.payload,
          },
        },
      };
    }
    case 'MENU_SET-MOD-SELECTED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            selected: action.payload,
          },
        },
      };
    }
    case 'COMBINATIONS_NEW': {
      return {
        ...state,
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
