import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import { FaMinus, FaPlus } from 'react-icons/fa';

const StyledOwnedMenuItem = styled.div`
  .item {
    display: flex;
    padding: 1px;
    margin: -1px;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      align-items: center;

      h1 {
        padding-right: 4px;
      }
    }

    .details {
      display: flex;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.tertiary};
      border-radius: 8px;
      margin: 0 8px;

      h1 {
        color: black;
        background-color: ${({ theme }) => theme.colors.accent};
        padding: 2px 6px;
        border-radius: 8px;
      }

      svg {
        color: ${({ theme }) => theme.colors.text.primary};
        font-size: 12px;
        /* padding: 0 2px 0 2px; */
        cursor: pointer;
      }

      svg:nth-child(1) {
        padding: 0 4px 0 6px;
      }
    }
  }

  .highlighted {
    .info {
    }
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

const OwnedMenuItem = ({ mod }) => {
  const {
    state: { menu, items, combinations },
    dispatch,
  } = GlobalContext();
  const [found, setFound] = useState();

  useEffect(() => {
    setFound(items.owned.find((found) => found.name === mod.name));
  }, [items, mod]);

  const handleAdd = () => {
    dispatch({ type: 'ITEMS_ADD-UNASSIGNED', payload: mod });
    dispatch({ type: 'ITEMS_GET-NEEDED', payload: combinations });
  };

  const handleRemove = () => {
    if (found.amount) {
      dispatch({ type: 'ITEMS_REMOVE-UNASSIGNED', payload: mod });
      dispatch({ type: 'ITEMS_GET-NEEDED', payload: combinations });
    }
  };

  return (
    <StyledOwnedMenuItem>
      <div
        className={
          menu.owned.filtered.find((item) => item.name === mod.name)
            ? 'item highlighted'
            : 'item'
        }
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
