import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledMenuItem = styled.div`
  margin-bottom: -2px;
  margin-left: -2px;
  cursor: ${({ showCursor }) => (showCursor ? 'pointer' : 'default')};

  .item-container {
    display: flex;
    align-items: center;
    padding: 2px;

    h1 {
      padding: 0 2px;
    }

    &:hover {
      padding: 1px;
      border: 1px solid black;
      border-radius: 4px;
    }
  }

  .selected {
    border: 2px solid black !important;
    padding: 0 !important;
    border-radius: 4px !important;
    cursor: pointer;
    position: relative;

    h1 {
      text-shadow: 0.5px 0 0 black;
      /* font-weight: 500; */
    }
  }
`;

const MenuItem = ({ mod }) => {
  const {
    state: {
      menu: { selected },
    },
    dispatch,
  } = GlobalContext();

  console.log(selected);

  const handleSelect = () => {
    if (selected.includes(mod.name))
      dispatch({ type: 'MENU_DESELECT', payload: mod.name });
    else if (selected.length < 4)
      dispatch({ type: 'MENU_SELECT', payload: mod.name });
  };

  return (
    <StyledMenuItem
      onClick={handleSelect}
      showCursor={selected.length < 4 ? true : false}
    >
      <div
        className={
          selected.includes(mod.name)
            ? 'item-container selected'
            : 'item-container'
        }
      >
        <img
          src={require(`../../data/images/${mod.imgName}`)}
          alt={mod.name}
          height={32}
        />
        <h1>{mod.name}</h1>
      </div>
    </StyledMenuItem>
  );
};

export default MenuItem;
