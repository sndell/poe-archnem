import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../../context';

const StyledSidebarItem = styled.div`
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
    margin-left: 8px;
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

const SidebarItem = ({ item }) => {
  const { dispatch } = GlobalContext();

  const handleClick = () => {
    console.log(item);
    dispatch({ type: 'ITEMS_ADD-OWNED', payload: item });
  };
  return (
    <StyledSidebarItem>
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
        <FaPlus onClick={handleClick} />
        <h1>{item.amount}</h1>
      </div>
    </StyledSidebarItem>
  );
};

export default SidebarItem;
