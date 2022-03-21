import React from 'react';
import styled from 'styled-components';
import { FaMinus } from 'react-icons/fa';
import { GlobalContext } from '../../context';

const StyledStatsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  .info {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 4px;
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
      padding: 0 6px 0 8px;
      cursor: pointer;
    }
  }
`;

const StatsItem = ({ item }) => {
  const {
    state: { combinations },
    dispatch,
  } = GlobalContext();
  const handleClick = () => {
    dispatch({ type: 'ITEMS_ADD-UNASSIGNED', payload: item });
    dispatch({ type: 'ITEMS_GET-NEEDED', payload: combinations });
  };
  return (
    <StyledStatsItem>
      <div className="info">
        <img
          src={require(`../../data/images/${item.imgName}`)}
          key={`img-${item.name}`}
          alt={item.name}
          height={32}
        />
        <h1>{item.name}</h1>
      </div>
      <div className="details">
        <FaMinus onClick={handleClick} />
        <h1>{item.amount}</h1>
      </div>
    </StyledStatsItem>
  );
};

export default StatsItem;
