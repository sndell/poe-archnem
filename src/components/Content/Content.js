import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPlusSquareFill } from 'react-icons/bs';
import ContentMenu from './ContentMenu';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;

  .hidden {
    display: none;
  }

  .content-top {
    height: 32px;
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: flex-end;

    &_new {
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: white;
      padding-left: 8px;

      h1 {
        font-weight: 500;
      }

      svg {
        font-size: 24px;
        padding: 0 4px 0 8px;
      }
    }
  }

  .content-main {
    display: flex;
    height: calc(100vh - 32px);
    width: 100%;
    background-color: red;
  }
`;

const Content = () => {
  const [menuMode, setMenuMode] = useState('create');
  const [menuActive, setMenuActive] = useState(false);
  const [menuSelected, setMenuSelected] = useState([]);

  const handleNew = () => {
    setMenuMode('create');
    setMenuSelected([]);
    setMenuActive(true);
  };

  return (
    <StyledContent>
      {menuActive && (
        <ContentMenu
          mode={menuMode}
          selected={menuSelected}
          close={() => setMenuActive(false)}
        />
      )}

      <header className="content-top">
        <div className="content-top_new" onClick={handleNew}>
          <h1>Create new</h1>
          <BsPlusSquareFill />
        </div>
      </header>
      <div className="content-main"></div>
    </StyledContent>
  );
};

export default Content;
