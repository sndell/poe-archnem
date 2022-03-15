const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW': {
      const items = action.payload.map(
        (mod) => state.mods.filter((item) => item.name === mod)[0]
      );
      return {
        ...state,
        combinations: {
          ...state.combinations,
          items: [
            ...state.combinations.items,
            { name: 'New Combination', id: Date.now().toString(), items },
          ],
        },
      };
    }
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
    case 'COMBINATIONS_SELECT': {
      return {
        ...state,
        combinations: {
          ...state.combinations,
          selected: [...state.combinations.selected, action.payload],
        },
      };
    }
    case 'COMBINATIONS_DESELECT': {
      return {
        ...state,
        combinations: {
          ...state.combinations,
          selected: state.combinations.selected.filter(
            (item) => item !== action.payload
          ),
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
