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
        combinations: [
          ...state.combinations,
          {
            id: Date.now().toString(),
            name: 'New Combination',
            active: true,
            mods: JSON.parse(JSON.stringify(action.payload)),
          },
        ],
      };
    }
    case 'COMBINATIONS_SET-ACTIVE': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const combination = combinations.find(
        (found) => found.id === action.payload.id
      );
      combination.active = action.payload.active;

      return {
        ...state,
        combinations,
      };
    }
    case 'COMBINATIONS_SET-ORDER': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const combination = combinations.find(
        (found) => found.id === action.payload.id
      );
      const index = combinations.indexOf(combination);

      if (action.payload.direction === 'up') {
        if (index - 1 >= 0) {
          combinations.splice(index - 1, 0, combinations.splice(index, 1)[0]);
        }
      } else {
        if (index + 1 < combinations.length) {
          combinations.splice(index + 1, 0, combinations.splice(index, 1)[0]);
        }
      }
      return {
        ...state,
        combinations,
      };
    }
    case 'COMBINATIONS_SET-NAME': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const combination = combinations.find(
        (found) => found.id === action.payload.id
      );
      console.log(combination.name);
      combination.name = action.payload.text;
      console.log(combination.name);
      return {
        ...state,
        combinations,
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
