const reducer = (state, action) => {
  switch (action.type) {
    case 'MENU_SET-OWNED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          owned: {
            ...state.menu.owned,
            active: action.payload.active,
            highlighted: [],
            selected: action.payload.selected,
            id: action.payload.id,
          },
        },
      };
    }
    case 'MENU_SET-OWNED-HIGHLIGHTED': {
      return {
        ...state,
        menu: {
          ...state.menu,
          owned: {
            ...state.menu.owned,
            highlighted: action.payload,
          },
        },
      };
    }
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
        refresh: true,
        combinations: [
          ...state.combinations,
          {
            id: Date.now().toString(),
            name: 'New Combination',
            active: true,
            mods: JSON.parse(JSON.stringify(action.payload)),
            calculated: [],
          },
        ],
      };
    }
    case 'COMBINATIONS_EDIT': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const combination = combinations.find(
        (found) => found.id === action.payload.id
      );
      combination.mods = action.payload.mods;
      return {
        ...state,
        combinations,
        refresh: true,
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
        refresh: true,
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
        refresh: true,
      };
    }
    case 'COMBINATIONS_SET-NAME': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const combination = combinations.find(
        (found) => found.id === action.payload.id
      );
      combination.name = action.payload.text;
      return {
        ...state,
        combinations,
      };
    }
    case 'COMBINATIONS_DELETE': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));

      return {
        ...state,
        combinations: combinations.filter((item) => item.id !== action.payload),
        refresh: true,
      };
    }
    case 'COMBINATIONS_CALCULATE': {
      const combinations = JSON.parse(JSON.stringify(action.payload));
      const _items = JSON.parse(JSON.stringify(state.items));
      const items = _items.owned
        .filter((item) => item.combination)
        .concat(_items.owned.filter((item) => !item.combination));
      console.log(items);
      const needed = [];
      console.log('refreasg');

      combinations.forEach((combination) => {
        combination.ready = 0;
        const resetMods = (mods) => {
          mods.forEach((mod) => {
            mod.assigned = false;
            if (mod.combination) mod.ready = false;
            if (mod.combination) resetMods(mod.combination);
          });
        };
        resetMods(combination.mods);
      });

      combinations
        .filter((item) => item.active === true)
        .forEach((combination) => {
          items
            .filter((item) => item.amount > 0)
            .forEach((owned) => {
              let count = owned.amount;
              while (count > 0) {
                let found;
                let layers = 0;
                let temp = 0;
                const findMod = (mods) => {
                  mods.forEach((mod) => {
                    temp++;
                    if (!mod.assigned) {
                      if (mod.name === owned.name) {
                        if (temp > layers) {
                          found = mod;
                          layers = temp;
                          temp = 0;
                        }
                      }
                      if (mod.combination) {
                        findMod(mod.combination);
                      }
                    }
                  });
                };
                findMod(combination.mods);
                if (found) {
                  found.assigned = true;
                  owned.amount--;
                  if (found.combination) {
                    const assignChildren = (mods) => {
                      mods.forEach((mod) => {
                        mod.assigned = true;
                        if (mod.combination) assignChildren(mod.combination);
                      });
                    };
                    assignChildren(found.combination);
                  }
                }
                count--;
              }
            });
        });

      combinations
        .filter((item) => item.active)
        .forEach((combination) => {
          const findNeeded = (mods) => {
            mods
              .filter((mod) => mod.combination)
              .forEach((mod) => {
                if (!mod.assigned) {
                  const found = mod.combination.find(
                    (found) => !found.assigned
                  );
                  if (!found) {
                    mod.ready = true;
                    combination.ready++;
                  }
                  findNeeded(mod.combination);
                }
              });
          };
          findNeeded(combination.mods);
        });

      combinations
        .filter((item) => item.active)
        .forEach((combination) => {
          const findNeeded = (mods) => {
            mods
              .filter((mod) => !mod.assigned)
              .forEach((mod) => {
                const found = needed.find((found) => found.name === mod.name);
                if (found) found.amount++;
                else {
                  const dupe = structuredClone(mod);
                  needed.push({ ...dupe, amount: 1 });
                }
                if (mod.combination) {
                  findNeeded(mod.combination);
                }
              });
          };
          findNeeded(combination.mods);
        });

      let explorer = {};
      if (state.explorer.id)
        explorer = combinations.find((found) => found.id === state.explorer.id);

      return {
        ...state,
        combinations,
        refresh: false,
        items: {
          ...state.items,
          needed: needed.sort((a, b) => a.name.localeCompare(b.name)),
        },
        explorer,
      };
    }
    case 'ITEMS_ADD-OWNED': {
      const owned = JSON.parse(JSON.stringify(state.items.owned));
      const found = owned.find((found) => found.name === action.payload.name);

      if (found) found.amount++;
      else owned.push({ ...action.payload, amount: 1 });

      return {
        ...state,
        items: {
          ...state.items,
          owned,
        },
        refresh: true,
      };
    }
    case 'ITEMS_REMOVE-OWNED': {
      const owned = JSON.parse(JSON.stringify(state.items.owned));
      const found = owned.find((found) => found.name === action.payload.name);
      found.amount--;

      return {
        ...state,
        items: {
          ...state.items,
          owned: owned.filter((item) => item.amount > 0),
        },
        refresh: true,
      };
    }
    case 'ITEMS_COMBINE-OWNED': {
      const owned = JSON.parse(JSON.stringify(state.items.owned));
      action.payload.combination.forEach((item) => {
        const found = owned.find((found) => found.name === item.name);
        found.amount--;
      });

      const found = owned.find((found) => found.name === action.payload.name);
      if (found) found.amount++;
      else owned.push({ ...action.payload, amount: 1 });
      console.log(owned);

      return {
        ...state,
        items: {
          ...state.items,
          owned: owned.filter((item) => item.amount > 0),
        },
        refresh: true,
      };
    }
    case 'EXPLORER_SET': {
      console.log('set');
      return {
        ...state,
        explorer: action.payload,
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
