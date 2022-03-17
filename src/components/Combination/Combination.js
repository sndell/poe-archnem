import React from 'react';
import styled from 'styled-components';
import { BsTrashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

const StyledCombination = styled.div`
  /* background-color: white; */
  display: flex;
  background-color: ${({ theme }) => theme.colors.secondary};
  /* box-sizing: border-box; */
  /* border-left: 8px solid ${({ theme }) => theme.colors.accent}; */
  /* border: 2px solid ${({ theme }) => theme.colors.tertiary}; */
  /* padding: 2px; */
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 8px;

  .details {
    display: flex;
    align-items: center;
    /* background-color: ${({ theme }) => theme.colors.accent}; */

    /* border: 2px solid ${({ theme }) => theme.colors.accent}; */

    h1 {
      color: ${({ theme }) => theme.colors.text.primary};
      margin-right: 8px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: 8px;
    padding-left: 8px;
    /* border: 1px solid white; */

    svg {
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: 16px;
      cursor: pointer;
    }

    /* .divider {
      width: 1px;
      height: 24px;
      border-radius: 16px;
      background-color: ${({ theme }) => theme.colors.text.primary};
    } */

    .actions-icons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .view-button {
      cursor: pointer;
      padding: 4px 8px;
      background-color: ${({ theme }) => theme.colors.accent};
      /* border: 2px solid ${({ theme }) => theme.colors.accent}; */
      /* color: white; */
      border-radius: 8px;
    }
  }
`;

const Combination = ({ combination }) => {
  return (
    <StyledCombination>
      <div className="details">
        <h1>{combination.name}</h1>
        {combination.mods.map((item) => (
          <img
            src={require(`../../data/images/${item.imgName}`)}
            key={`${combination.id}-${item.name}`}
            alt={item.name}
            height={40}
          />
        ))}
      </div>
      <div className="actions">
        {/* <BsThreeDotsVertical /> */}
        <div className="actions-icons">
          <IoMdCheckmark />
          <IoMdClose />
          <MdEdit />
          <BsTrashFill />
          <AiFillEye />
        </div>
        <div className="divider" />
        <h1 className="view-button">View</h1>
      </div>
    </StyledCombination>
  );
};

export default Combination;
