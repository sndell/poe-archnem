import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import CombinationsItem from './CombinationsItem';

const StyledCombinations = styled.div`
  height: 100%;
  overflow-y: hidden;

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

  .main {
    padding: 8px;
    /* height: 100%; */
    height: calc(100% - 40px);
    overflow-y: auto;
  }
`;
const Combinations = () => {
  const {
    state: { combinations },
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
          Create New
        </h1>
      </div>
      <div className="main">
        {combinations.map((item) => (
          <CombinationsItem combination={item} key={item.id} />
        ))}
      </div>
    </StyledCombinations>
  );
};

export default Combinations;
