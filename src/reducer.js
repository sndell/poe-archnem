const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_SET-FILTERED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          filtered: action.payload,
        },
      };
    }
    case 'MENU_SET-SELECTED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          selected: action.payload,
        },
      };
    }
    case 'MENU_SET-ACTIVE': {
      return {
        ...state,
        menu: {
          ...state.menu,
          active: action.payload,
          selected: [],
        },
      };
    }
    case 'COMBINATIONS_NEW': {
      console.log(action.payload);
      return {
        ...state,
        combinations: [
          ...state.combinations,
          {
            id: Date.now().toString(),
            name: 'New Combination',
            active: true,
            mods: action.payload,
            assinged: [],
          },
        ],
        menu: {
          ...state.menu,
          selected: [],
          active: false,
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
