import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context';

const StyledExplorer = styled.div`
  .home {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    overflow: hidden;

    .home-top {
      min-height: 40px;
      display: flex;
      justify-content: end;
      align-items: center;
      padding: 0 8px;
      /* border-top-left-radius: 8px; */
      /* border-top-right-radius: 8px; */
      border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
      background-color: ${({ theme }) => theme.colors.secondary};

      h1 {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.accent};
        padding: 4px 8px;
        /* border: 2px solid ${({ theme }) => theme.colors.accent}; */
        border-radius: 8px;
      }
    }

    .home-main {
      display: flex;
      gap: 8px;
      width: 800px;
      padding: 8px;
      /* background-color: ${({ theme }) => theme.colors.primary}; */

      .combinations-container {
        border-radius: 8px;
        /* width: 800px; */
        width: 100%;
        padding: 8px;
        gap: 8px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const Explorer = ({ combination }) => {
  const { dispatch } = GlobalContext();

  const handleBack = () => {
    dispatch({ type: 'EXPLORER_SET', payload: {} });
  };

  return (
    <StyledExplorer>
      <div className="home">
        <div className="home-top">
          <div className="new-button">
            <h1 onClick={handleBack}>Back</h1>
          </div>
        </div>
        <div className="home-main">
          <div className="combinations-container"></div>
        </div>
      </div>
    </StyledExplorer>
  );
};

export default Explorer;
