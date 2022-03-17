import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import { GrClose, GrCheckmark } from 'react-icons/gr';
import MenuItem from './MenuItem';

const StyledMenu = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  .menu {
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    &_content {
      display: flex;
      padding: 8px;

      .drop,
      .recipie,
      .boss {
        /* padding: 8px; */
      }

      .drop,
      .recipie {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        /* margin-right: 18px; */
        /* border-right: 1px solid black; */
      }

      .drop {
        /* color: #160094; */
      }

      .recipie {
        /* color: #018312; */
      }

      .boss {
        /* color: #d60a0a; */
        display: flex;
        flex-direction: column;
      }
    }

    &_bottom {
      display: flex;
      justify-content: center;
      gap: 16px;
      border-top: 1px solid black;
      padding: 4px 8px;

      .close {
        cursor: pointer;
      }

      .confirm {
        cursor: pointer;
      }
    }
  }
`;

const Menu = () => {
  const {
    state: { menu, mods },
    dispatch,
  } = GlobalContext();
  const getMenuItem = (mod, type) => {
    return <MenuItem mod={mod} key={`${type}-${mod.name}`} />;
  };

  const handleClose = () => {
    dispatch({ type: 'MENU_CLOSE' });
  };

  const handleConfirm = () => {
    if (menu.selected.length > 0) {
      const items = menu.selected.map(
        (mod) => mods.filter((item) => item.name === mod)[0]
      );
      // setSelected(items);
      // calcNeeded(items);
      dispatch({ type: 'NEW', payload: { items } });
      dispatch({ type: 'MENU_CLOSE' });
    }
  };

  // useEffect(() => {
  //   if (finnished) {
  //     setNeeded([]);
  //     setFinnished(false);
  //     dispatch({ type: 'NEW', payload: { items: selected, needed } });
  //   }
  // }, [needed, finnished, selected, dispatch]);

  // const calcNeeded = (selected) => {
  //   selected.forEach((item) => {
  //     setNeeded((old) => [...old, item]);
  //     if (item.combination) calcNeeded(item.combination);
  //   });
  //   setFinnished(true);
  // };

  return (
    <StyledMenu className={!menu.active && 'hidden'}>
      <div className="menu">
        <div className="menu_content">
          <div className="drop">
            {mods
              .filter((mod) => !mod.combination)
              .map((mod) => getMenuItem(mod, 'drop'))}
          </div>
          <div className="recipie">
            {mods
              .filter((mod) => mod.combination && !mod.name.includes('touched'))
              .map((mod) => getMenuItem(mod, 'recipie'))}
          </div>
          <div className="boss">
            {mods
              .filter((mod) => mod.combination && mod.name.includes('touched'))
              .map((mod) => getMenuItem(mod, 'boss'))}
          </div>
        </div>
        <div className="menu_bottom">
          <GrClose onClick={handleClose} className="close" />
          <GrCheckmark onClick={handleConfirm} className="confirm" />
        </div>
      </div>
    </StyledMenu>
  );
};

export default Menu;
