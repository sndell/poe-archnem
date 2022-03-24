import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import { FaPlus, FaMinus } from 'react-icons/fa';

const StyledOwnedMenuItem = styled.div`
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
    justify-content: space-between;
    padding: 1px;
    border-radius: 8px;

    .info {
      display: flex;
      align-items: center;

      h1 {
        padding: 0 4px;
      }
    }

    .details {
      display: flex;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.tertiary};
      border-radius: 8px;
      margin: 0 4px;
      h1 {
        color: black;
        font-weight: 400;
        background-color: ${({ theme }) => theme.colors.accent};
        padding: 2px 6px;
        border-radius: 8px;
      }
      svg {
        color: ${({ theme }) => theme.colors.text.primary};
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        padding-right: 6px;
      }
      svg:nth-child(1) {
        padding: 0 6px 0 8px;
      }
    }
  }

  .highlighted {
    border: 1px solid ${({ theme }) => theme.colors.text.primary};
    padding: 0;
    /* border: 1px solid white; */
  }
`;

const OwnedMenuItem = ({ mod, type }) => {
  const {
    state: { menu, items },
    dispatch,
  } = GlobalContext();

  const [found, setFound] = useState();

  useEffect(() => {
    setFound(items.owned.find((found) => found.name === mod.name));
  }, [items, mod]);

  const handleAdd = () => {
    dispatch({ type: 'ITEMS_ADD-OWNED', payload: mod });
  };

  const handleRemove = () => {
    console.log('remove');
    if (found) {
      dispatch({ type: 'ITEMS_REMOVE-OWNED', payload: mod });
    }
  };

  return (
    <StyledOwnedMenuItem>
      <div
        className={`
  ${
    menu.owned.highlighted.find((item) => item.name === mod.name)
      ? 'item highlighted'
      : 'item'
  } ${type} `}
      >
        <div className="info">
          <img
            src={require(`../../data/images/${mod.imgName}`)}
            alt={mod.name}
            height={32}
          />
          <h1>{mod.name}</h1>
        </div>
        <div className="details">
          <FaMinus onClick={handleRemove} />
          <FaPlus onClick={handleAdd} />
          <h1>{found ? found.amount : 0}</h1>
        </div>
      </div>
    </StyledOwnedMenuItem>
  );
};

export default OwnedMenuItem;
