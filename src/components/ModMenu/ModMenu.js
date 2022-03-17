import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import ModMenuItem from './ModMenuItem';
import { BiSearch } from 'react-icons/bi';
import { GrClose, GrCheckmark } from 'react-icons/gr';

const StyledModMenu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000b4;
  top: 0;
  left: 0;

  .menu {
    /* border: 1px solid black; */
    padding: 1px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    flex-direction: column;

    .menu-top {
      display: flex;
      /* background-color: #28282fff; */
      background-color: ${({ theme }) => theme.colors.secondary};
      align-items: center;
      border-bottom: 2px solid ${({ theme }) => theme.colors.accent};

      input {
        /* font-size: 13px; */
        background-color: rgba(0, 0, 0, 0);
        color: #c2c2c5;
        width: 100%;
        height: 24px;
        padding: 0;
        padding-top: 2px;
        margin: 0;
        border: 0;
        outline: 0;

        &::placeholder {
          color: #c2c2c5;
        }
      }

      svg {
        font-size: 20px;
        padding: 0 8px;
        color: #ffffff;
      }
    }

    .menu-main {
      display: flex;
      color: white;
      padding: 10px 8px 2px 8px;

      .drop,
      .recipie,
      .boss {
        display: flex;
        flex-direction: column;

        h1 {
          margin-left: 4px;
        }
      }

      .drop,
      .recipie {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .drop {
        color: #62f2ff;
      }

      .recipie {
        color: #5cff69;
      }

      .boss {
        color: #f54d23;
      }
    }

    .menu-bottom {
      /* border-top: 2px solid #e2a011; */
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 4px 0;
      /* color: #e2a011; */

      svg {
        background-color: ${({ theme }) => theme.colors.accent};
        padding: 4px 8px;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
`;

const ModMenu = () => {
  const {
    state: { mods, menu },
    dispatch,
  } = GlobalContext();

  const [filterText, setFilterText] = useState('');

  const handleFilterText = (e) => {
    setFilterText(e.target.value);
  };

  const handleConfirm = () => {
    if (menu.selected.length > 0) {
      dispatch({ type: 'COMBINATIONS_NEW', payload: menu.selected });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'MENU_SET-ACTIVE', payload: false });
  };

  useEffect(() => {
    if (filterText.length > 0) {
      const found = mods.filter((mod) =>
        mod.name.toLowerCase().includes(filterText.toLowerCase())
      );
      dispatch({ type: 'MENU_SET-FILTERED', payload: found });
    } else dispatch({ type: 'MENU_SET-FILTERED', payload: [] });
  }, [filterText, dispatch, mods]);

  return (
    <StyledModMenu>
      <div className="menu">
        <div className="menu-top">
          <BiSearch />
          <input
            type="text"
            value={filterText}
            onChange={handleFilterText}
            placeholder="highlight mods..."
          />
        </div>
        <div className="menu-main">
          <div className="drop">
            {mods
              .filter((mod) => !mod.combination)
              .map((mod) => (
                <ModMenuItem mod={mod} key={`drop-${mod.name}`} />
              ))}
          </div>
          <div className="recipie">
            {mods
              .filter((mod) => mod.combination && !mod.name.includes('touched'))
              .map((mod) => (
                <ModMenuItem mod={mod} key={`recipie-${mod.name}`} />
              ))}
          </div>
          <div className="boss">
            {mods
              .filter((mod) => mod.name.includes('touched'))
              .map((mod) => (
                <ModMenuItem mod={mod} key={`boss-${mod.name}`} />
              ))}
          </div>
        </div>
        <div className="menu-bottom">
          <GrClose onClick={handleClose} />
          <GrCheckmark onClick={handleConfirm} />
        </div>
      </div>
    </StyledModMenu>
  );
};

export default ModMenu;
