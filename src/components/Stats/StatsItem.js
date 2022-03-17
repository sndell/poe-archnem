import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { GlobalContext } from '../../context';

const StyledStatsItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  .stats-mod {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 4px;
    }
  }

  .stats-needed {
    display: flex;
    justify-content: end;
    align-items: center;

    h1:nth-child(2) {
      padding: 0 6px;
    }

    svg:nth-child(1) {
      margin-left: 8px;
    }

    svg {
      cursor: pointer;
      font-size: 14px;
    }
  }
`;

const StatsItem = ({ item, owned }) => {
  const {
    state: {
      combinations: { selected },
      owned: { all },
    },
    dispatch,
  } = GlobalContext();

  const handleRemove = () => {
    if (!owned) {
      dispatch({ type: 'ADD_OWNED', payload: item });
      // dispatch({ type: 'GET_NEEDED', payload: selected });
    }
  };
  const handleAdd = () => {
    if (owned) {
      dispatch({ type: 'ADD_OWNED', payload: item });
      // dispatch({ type: 'GET_NEEDED', payload: selected });
    }
  };

  useEffect(() => {
    dispatch({ type: 'GET_NEEDED', payload: selected });
  }, [all, selected, dispatch]);

  if (item.amount > 0) {
    return (
      <StyledStatsItem>
        <div className="stats-mod">
          <img
            src={require(`../../data/images/${item.imgName}`)}
            alt={item.name}
            height={32}
          />
          <h1>{item.name}</h1>
        </div>
        <div className="stats-needed">
          <BiMinus onClick={handleRemove} />
          <h1>{item.amount}</h1>
          <BiPlus onClick={handleAdd} />
        </div>
      </StyledStatsItem>
    );
  }
  return null;
};

export default StatsItem;
