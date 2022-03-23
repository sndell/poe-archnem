import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledCombinations = styled.div`
  .top {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
    height: 40px;
    padding: 0 8px;
    display: flex;
    justify-content: end;
    align-items: center;

    .top-new-btn {
      background-color: ${({ theme }) => theme.colors.accent};
      padding: 4px 6px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
    }
  }
`;
const Combinations = () => {
  const {
    // state: { menu },
    dispatch,
  } = GlobalContext();

  const handleNew = () => {
    dispatch({
      type: 'MENU_SET-MOD',
      payload: { active: true, id: '', selected: [] },
    });
  };

  return (
    <StyledCombinations>
      <div className="top">
        <h1 className="top-new-btn" onClick={handleNew}>
          Create new
        </h1>
      </div>
    </StyledCombinations>
  );
};

export default Combinations;
