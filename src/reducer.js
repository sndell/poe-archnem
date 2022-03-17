const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW': {
      // const items = action.payload.map(
      //   (mod) => state.mods.filter((item) => item.name === mod)[0]
      // );
      console.log(action.payload);
      return {
        ...state,
        combinations: {
          ...state.combinations,
          items: [
            ...state.combinations.items,
            {
              name: 'New Combination',
              id: Date.now().toString(),
              items: action.payload.items,
              // needed: action.payload.needed,
            },
          ],
          selected: [
            ...state.combinations.selected,
            {
              name: 'New Combination',
              id: Date.now().toString(),
              items: action.payload.items,
              // needed: action.payload.needed,
            },
          ],
        },

        menu: {
          ...state.menu,
          selected: [],
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
      action.payload.assigned = [];
      console.log(action.payload);
      return {
        ...state,
        combinations: {
          ...state.combinations,
          selected: [...state.combinations.selected, action.payload],
        },
      };
    }
    case 'COMBINATIONS_DESELECT': {
      // console.log(action.payload);
      // console.log(state.combinations.selected);
      return {
        ...state,
        combinations: {
          ...state.combinations,
          selected: state.combinations.selected.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    }
    case 'SET_EXPANDED': {
      return {
        ...state,
        expanded: action.payload,
      };
    }
    case 'ADD_UNASSIGNED': {
      return {
        ...state,
      };
    }

    case 'ADD_OWNED': {
      const all = [...state.owned.all];
      // const object =
      //   state.owned.all[
      //     state.owned.all.findIndex((item) => item.name === action.payload.name)
      //   ];

      const found = all.find((mod) => mod.name === action.payload.name);

      if (found) {
        const test = [];
        // all[all.indexOf(found)].amount++;
        all.forEach((item, index) => {
          if (index !== all.indexOf(found)) test.push(item);
          else {
            const dupe = { ...found };
            console.log(dupe);
            dupe.amount++;
            console.log(dupe);
            // console.log(dupe);
            // dupe.amount++;
            // console.log(dupe);
            test.push(dupe);
          }
        });
        console.log(found);
        console.log(test);
        return {
          ...state,
          owned: {
            ...state.owned,
            all: test,
          },
        };
      }
      console.log('eee');
      return {
        ...state,
        owned: {
          ...state.owned,
          all: [...state.owned.all, { ...action.payload, amount: 1 }],
        },
      };
    }
    case 'GET_NEEDED': {
      const recipie = [];
      const getRecipie = (items) => {
        items.forEach((item) => {
          if (item.combination) {
            recipie.push(item);
            getRecipie(item.combination);
          }
        });
      };

      const drop = [];
      const getDrop = (items) => {
        items.forEach((item) => {
          if (item.combination) getDrop(item.combination);
          else drop.push(item);
        });
      };

      const all = [];
      action.payload.forEach(({ items }) => {
        items.forEach((item) => all.push(item));
      });

      // all.forEach((item) => {
      //   console.log(state.owned.all);
      //   console.log(item);
      // });

      getRecipie(all);
      getDrop(all);
      //
      // getDrop(recipie);
      const total = recipie.concat(drop);
      const unique = [];

      [...new Set(total)].forEach((item) => {
        unique.push({
          ...item,
          amount: total.filter((mod) => mod.name === item.name).length,
        });
      });

      const getOwnedDrop = (items) => {
        // console.log(items);
        items.forEach((item) => {
          // console.log('--------------------');
          // console.log(item);
          let amount;
          if (item.amount) amount = item.amount;
          else amount = 1;
          for (let i = 0; i < amount; i++) {
            const found = unique.find((mod) => mod.name === item.name);
            if (found) {
              if (found.amount > 0) {
                // console.log(found);
                unique[unique.indexOf(found)].amount--;
                // console.log(item.combination);
                if (item.combination) {
                  getOwnedDrop(item.combination);
                }
              }
            }
          }
          // if (item.combination) {
          //   getOwnedDrop(item.combination);
          // }
        });
      };
      // console.log(state.owned.all);
      getOwnedDrop(state.owned.all);

      // console.log(unique);

      // const needed = [...new Set(neededUnique)]
      //   .filter((item) => item.combination)
      //   .map((item) => {
      //     return {
      //       ...item,
      //       amount: neededUnique.filter((mod) => mod.name === item.name).length,
      //     };
      //   });
      // needed.forEach((item, index) => {
      //   const dupe = state.owned.all
      //     .filter((own) => own.combination)
      //     .filter((mod) => mod.name === item.name);
      //   if (dupe.length > 0) {
      //     console.log(dupe);
      //   }
      // if (
      //   state.owned.all.filter((mod) => mod.name === item.name).length > 0
      // ) {
      //   needed[index].amount -= state.owned.all.filter(
      //     (mod) => mod.name === item.name
      //   )[0].amount;
      // console.log(needed[index].amount);
      // console.log(
      //   state.owned.all.filter((mod) => mod.name === item.name)[0].amount
      // );
      // }
      // });
      // console.log(needed);
      // needed.forEach((item, index) => {
      //   const dupe = state.owned.all.filter((mod) => mod.name === item.name);
      //   if (dupe.length > 0) {
      //     console.log(dupe);
      //   }
      //   if (
      //     state.owned.all.filter((mod) => mod.name === item.name).length > 0
      //   ) {
      //     needed[index].amount -= state.owned.all.filter(
      //       (mod) => mod.name === item.name
      //     )[0].amount;
      //     // console.log(needed[index].amount);
      //     // console.log(
      //     //   state.owned.all.filter((mod) => mod.name === item.name)[0].amount
      //     // );
      //   }
      // });
      return {
        ...state,
        needed: unique.sort((a, b) => a.name.localeCompare(b.name)),
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
