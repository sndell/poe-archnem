import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledContent = styled.div`
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
`;

const Content = () => {
  const { dispatch } = GlobalContext();
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
    </StyledContent>
  );
};

export default Content;
