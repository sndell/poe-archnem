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
    case 'NEEDED_GET': {
      const needed = [];

      action.payload.forEach((item) => {
        if (item.active) {
          const getNeeded = (items) => {
            items.forEach((mod) => {
              const found = needed.find((found) => found.name === mod.name);
              if (mod.combination) {
                if (found) found.amount++;
                else {
                  mod.amount = 1;
                  needed.push(mod);
                }
                getNeeded(mod.combination);
              } else {
                if (found) found.amount++;
                else {
                  mod.amount = 1;
                  needed.push(mod);
                }
              }
            });
          };

          getNeeded(item.mods);
          // console.log(neededRecipie.concat(neededDrop));
        }
      });
      console.log(needed);
      return {
        ...state,
        needed: {
          ...state.needed,
          all: needed,
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
