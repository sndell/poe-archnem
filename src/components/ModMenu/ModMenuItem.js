import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledModMenuItem = styled.div`
  .item {
    display: flex;
    align-items: center;
    padding: 1px;
    margin: -1px;
    cursor: pointer;

    h1 {
      padding-right: 4px;
    }
  }

  .highlighted {
    /* box-sizing: border-box;  */
    border: 1px solid white;
    border-radius: 4px;
    padding: 0;
  }

  .selected {
    background-color: white;
    text-shadow: 0.5px 0 0 black;
    color: black;
    border-radius: 4px;
  }
`;

const ModMenuItem = ({ mod }) => {
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
    dispatch({ type: 'MENU_MOD_SET-SELECTED', payload: items });
  };

  return (
    <StyledModMenuItem>
      <div
        className={
          menu.mod.filtered.find((item) => item.name === mod.name)
            ? menu.mod.selected.find((item) => item.name === mod.name)
              ? 'item highlighted selected'
              : 'item highlighted'
            : menu.mod.selected.find((item) => item.name === mod.name)
            ? 'item selected'
            : 'item'
        }
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
