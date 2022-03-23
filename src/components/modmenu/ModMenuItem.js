import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledModMenuItem = styled.div`
  margin-bottom: -1px;
  margin-left: -1px;
  .drop {
    color: ${({ theme }) => theme.colors.text.mods.drop};
  }
  .recipie {
    color: ${({ theme }) => theme.colors.text.mods.recipie};
  }
  .boss {
    color: ${({ theme }) => theme.colors.text.mods.boss};
  }

  .item {
    display: flex;
    align-items: center;
    padding: 1px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    h1 {
      padding: 0 4px;
    }
  }

  .highlighted {
    border: 1px solid ${({ theme }) => theme.colors.text.primary};
    padding: 0;
    /* border: 1px solid white; */
  }

  .selected {
    background-color: white;
    text-shadow: 0.5px 0 0 black;
    color: black;
  }
`;

const ModMenuItem = ({ mod, type }) => {
  const {
    state: { menu },
    dispatch,
  } = GlobalContext();

  const handleSelect = () => {
    let items = [];
    if (menu.mod.selected.find((item) => item.name === mod.name))
      items = menu.mod.selected.filter((item) => item.name !== mod.name);
    else if (menu.mod.selected.length < 4) items = [...menu.mod.selected, mod];
    else items = menu.mod.selected;
    dispatch({ type: 'MENU_SET-MOD-SELECTED', payload: items });
  };

  return (
    <StyledModMenuItem>
      <div
        className={`
        ${
          menu.mod.highlighted.find((item) => item.name === mod.name)
            ? menu.mod.selected.find((item) => item.name === mod.name)
              ? 'item highlighted selected'
              : 'item highlighted'
            : menu.mod.selected.find((item) => item.name === mod.name)
            ? 'item selected'
            : 'item'
        } ${type} `}
        onClick={handleSelect}
      >
        <img
          src={require(`../../data/images/${mod.imgName}`)}
          alt={mod.name}
          height={32}
        />
        <h1>{mod.name}</h1>
      </div>
    </StyledModMenuItem>
  );
};

export default ModMenuItem;
