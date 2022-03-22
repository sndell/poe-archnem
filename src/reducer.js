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
            assigned: [],
            needed: [],
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
    case 'COMBINATIONS_GET-NEEDED': {
      // console.log(action.payload);
      const needed = [];
      const filtered = [];
      const assigned = JSON.parse(JSON.stringify(action.payload.assigned));
      const getNeeded = (items) => {
        items.forEach((mod) => {
          const found = needed.find((found) => found.name === mod.name);
          const foundOwned = assigned.find(
            (foundOwned) =>
              foundOwned.name === mod.name && foundOwned.amount > 0
          );
          if (foundOwned) {
            foundOwned.amount--;
            // console.log(assigned);
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

      getNeeded(action.payload.mods);
      // console.log(needed);
      needed.forEach((item) => {
        const found = state.items.unassigned
          .filter((item) => item.amount > 0)
          .find((found) => item.name === found.name);
        // if (found.amount > item.amount)
        if (found) {
          if (found.amount > item.amount) filtered.push(item);
          else filtered.push(found);
        }
      });

      const found = state.combinations.find(
        (found) => found.id === action.payload.id
      );
      found.needed = filtered.sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...state,
      };
    }
    case 'COMBINATIONS_ASSIGN': {
      const combinations = JSON.parse(JSON.stringify(state.combinations));
      const foundCombination = combinations.find(
        (found) => found.id === state.explorer.combination.id
      );
      const assigned = JSON.parse(JSON.stringify(foundCombination.assigned));
      const found = assigned.find(
        (found) => found.name === action.payload.name
      );
      if (found) {
        // console.log(assigned.indexOf(found));
        const mod = assigned.splice(assigned.indexOf(found), 1)[0];
        mod.amount++;
        // console.log(mod);
        // console.log('yes');
        assigned.push(mod);
      } else assigned.push({ ...action.payload, amount: 1 });
      // console.log(assigned);
      assigned.sort((a, b) => a.name.localeCompare(b.name));
      combinations[combinations.indexOf(foundCombination)].assigned = assigned;
      const items = JSON.parse(JSON.stringify(state.items));
      // console.log(items);
      const foundUnassigned = items.unassigned.splice(
        items.unassigned.findIndex((item) => item.name === action.payload.name),
        1
      )[0];
      foundUnassigned.amount--;
      items.unassigned.push(foundUnassigned);
      // console.log(items);
      // const foundAssignedIndex = items.assigned.findIndex(
      //   (item) => item.name === action.payload.name
      // );
      // console.log(foundAssignedIndex);
      // const foundAssigned = items.assigned.splice(
      //   items.assigned.findIndex((item) => item.name === action.payload.name),
      //   1
      // );

      return {
        ...state,
        combinations,
        explorer: {
          combination: combinations.find(
            (found) => found.id === state.explorer.combination.id
          ),
        },
        items: {
          ...state.items,
          unassigned: items.unassigned,
        },
      };
    }
    case 'COMBINATIONS_UNASSIGN': {
      // console.log(action.payload);
      const combinations = state.combinations.find(
        (found) => found.id === state.explorer.combination.id
      );
      const assigned = JSON.parse(JSON.stringify(combinations.assigned));
      const found = assigned.splice(
        assigned.findIndex((found) => found.name === action.payload.name),
        1
      )[0];
      if (found) {
        found.amount--;
        if (found.amount > 0) assigned.push(found);
        console.log(found);
      }

      combinations.assigned = assigned.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const items = JSON.parse(JSON.stringify(state.items.unassigned));
      const foundUnassigned = items.find(
        (found) => found.name === action.payload.name
      );
      if (foundUnassigned) {
        const found = items.splice(items.indexOf(foundUnassigned), 1)[0];
        found.amount++;
        items.push(found);
      } else {
        items.push({ ...action.payload, amount: 1 });
      }

      return {
        ...state,
        items: {
          ...state.items,
          unassigned: items.sort((a, b) => a.name.localeCompare(b.name)),
        },
        explorer: {
          combination: state.combinations.find(
            (found) => found.id === state.explorer.combination.id
          ),
        },
      };
    }
    case 'COMBINATIONS_GET-TREE': {
      action.payload.forEach((item) => {
        const mods = JSON.parse(JSON.stringify(item.mods));
        const assigned = JSON.parse(
          JSON.stringify(
            state.combinations.find((found) => found.id === item.id).assigned
          )
        );
        console.log(assigned);
      });
      return {
        ...state,
      };
    }
    case 'ITEMS_GET-NEEDED': {
      const needed = [];
      const unassigned = JSON.parse(JSON.stringify(state.items.unassigned));
      const assigned = [];
      const owned = [];

      JSON.parse(JSON.stringify(action.payload)).forEach((item) => {
        item.assigned.forEach((item) => {
          const found = assigned.find((found) => found.name === item.name);
          // console.log(found);
          // console.log(item);
          if (found) found.amount += item.amount;
          else assigned.push(item);
        });
      });

      unassigned.forEach((item) => owned.push(item));
      assigned.forEach((item) => {
        const found = owned.find((found) => found.name === item.name);
        // console.log(found);
        // console.log(item);
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
      const found = unassigned.find(
        (item) => item.name === action.payload.name
      );

      if (found.amount > 0) {
        if (found) {
          // const amount = { ...unassigned[foundIndex] }.amount;
          const amount = unassigned.splice(unassigned.indexOf(found), 1)[0]
            .amount;
          unassigned.push({ ...action.payload, amount: amount - 1 });
        } else {
          unassigned.push({ ...action.payload, amount: 1 });
        }
        unassigned.sort((a, b) => a.name.localeCompare(b.name));
      }

      return {
        ...state,
        items: {
          ...state.items,
          unassigned,
        },
      };
    }
    case 'EXPLORER_SET': {
      return {
        ...state,
        explorer: {
          combination: action.payload,
        },
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
