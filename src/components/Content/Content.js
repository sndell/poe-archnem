import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import Combination from '../Combination/Combination';

const StyledContent = styled.div`
  width: 100%;

  .content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    /* background-color: red; */

    &_button {
      margin: 8px;
      cursor: pointer;

      h1 {
        padding: 4px 8px;
        border: 1px solid black;
        border-radius: 2px;
      }
    }
  }

  .content-main {
    padding: 8px;
  }
`;

const Content = () => {
  const {
    state: { combinations },
    dispatch,
  } = GlobalContext();
  const handleNew = () => {
    dispatch({ type: 'MENU_NEW' });
  };

  return (
    <StyledContent>
      <header className="content-top">
        <div className="content-top_filter"></div>
        <div className="content-top_button" onClick={handleNew}>
          <h1>create new</h1>
        </div>
      </header>
      <div className="content-main">
        {combinations.items.map((combination) => (
          <Combination combination={combination} key={combination.id} />
        ))}
      </div>
    </StyledContent>
  );
};

export default Content;
