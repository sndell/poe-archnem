const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW': {
      // const items = action.payload.map(
      //   (mod) => state.mods.filter((item) => item.name === mod)[0]
      // );
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
              needed: action.payload.needed,
            },
          ],
          selected: [
            ...state.combinations.selected,
            {
              name: 'New Combination',
              id: Date.now().toString(),
              items: action.payload.items,
              needed: action.payload.needed,
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
      const object =
        state.owned.all[
          state.owned.all.findIndex((item) => item.name === action.payload.name)
        ];

      if (object) {
        // console.log(owned.filter(item => item.name));
        return {
          ...state,
          owned: {
            ...state.owned,
            all: [
              ...state.owned.all.filter(
                (item) => item.name !== action.payload.name
              ),
              {
                ...object,
                amount: object.amount++,
              },
            ],
          },
        };
      }
      return {
        ...state,
        owned: {
          ...state.owned,
          all: [...state.owned.all, { ...action.payload, amount: 1 }],
        },
      };
    }
    case 'GET_NEEDED': {
      const neededUnique = [];
      action.payload.forEach((item) =>
        item.needed.forEach((item) => neededUnique.push(item))
      );
      // const items = {};
      // console.log([...new Set(needed)]);

      // [...new Set(needed)].forEach((item) => {
      //   items[item.name] = needed.filter(
      //     (mod) => mod.name === item.name
      //   ).length;
      // });

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
      });
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
        needed: needed.sort(),
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
