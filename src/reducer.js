const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_MOD_SET-FILTERED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            filtered: action.payload,
          },
        },
      };
    }
    case 'MENU_MOD_SET-SELECTED': {
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
    case 'MENU_MOD_SET-ACTIVE': {
      return {
        ...state,
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            active: action.payload,
            selected: [],
          },
        },
      };
    }
    case 'MENU_OWNED_SET-FILTERED': {
      console.log(action.payload);
      return {
        ...state,
        menu: {
          ...state.menu,
          owned: {
            ...state.menu.owned,
            filtered: action.payload,
            test: 'hello',
          },
        },
      };
    }
    case 'MENU_OWNED_SET-ACTIVE': {
      return {
        ...state,
        menu: {
          ...state.menu,
          owned: {
            ...state.menu.owned,
            active: action.payload,
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
            mods: action.payload,
            assinged: [],
          },
        ],
        menu: {
          ...state.menu,
          mod: {
            ...state.menu.mod,
            active: false,
            selected: [],
          },
        },
      };
    }
    case 'ITEMS_GET-NEEDED': {
      const needed = [];
      const unassigned = JSON.parse(JSON.stringify(state.items.unassigned));
      const assigned = JSON.parse(JSON.stringify(state.items.assigned));
      const owned = [];

      unassigned.forEach((item) => owned.push(item));
      assigned.forEach((item) => {
        const found = owned.filter((found) => found.name === item.name);
        if (found) found.amount += item.amount;
        else owned.push(item);
      });

      const _owned = JSON.parse(JSON.stringify(owned));

      action.payload.forEach((item) => {
        if (item.active) {
          const getNeeded = (items) => {
            items.forEach((mod) => {
              const found = needed.find((found) => found.name === mod.name);
              const foundOwned = _owned.find(
                (foundOwned) =>
                  foundOwned.name === mod.name && foundOwned.amount > 0
              );
              if (foundOwned) {
                foundOwned.amount--;
              } else {
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
              }
            });
          };

          getNeeded(item.mods);
          // console.log(neededRecipie.concat(neededDrop));
        }
      });
      needed.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        items: {
          ...state.items,
          needed: needed,
          owned,
        },
      };
    }
    case 'ITEMS_ADD-UNASSIGNED': {
      const unassigned = JSON.parse(JSON.stringify(state.items.unassigned));
      const foundIndex = unassigned.findIndex(
        (item) => item.name === action.payload.name
      );

      if (foundIndex !== -1) {
        // const amount = { ...unassigned[foundIndex] }.amount;
        const amount = unassigned.splice(foundIndex, 1)[0].amount;
        unassigned.push({ ...action.payload, amount: amount + 1 });
      } else {
        unassigned.push({ ...action.payload, amount: 1 });
      }
      unassigned.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        items: {
          ...state.items,
          unassigned,
        },
      };
    }
    case 'ITEMS_REMOVE-UNASSIGNED': {
      const unassigned = JSON.parse(JSON.stringify(state.items.unassigned));
      const foundIndex = unassigned.findIndex(
        (item) => item.name === action.payload.name
      );

      if (foundIndex !== -1) {
        // const amount = { ...unassigned[foundIndex] }.amount;
        const amount = unassigned.splice(foundIndex, 1)[0].amount;
        unassigned.push({ ...action.payload, amount: amount - 1 });
      } else {
        unassigned.push({ ...action.payload, amount: 1 });
      }
      unassigned.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        items: {
          ...state.items,
          unassigned,
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
