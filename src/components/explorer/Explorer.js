import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import ExplorerItem from './ExplorerItem';

const StyledExplorer = styled.div`
  height: 100%;
  overflow-y: hidden;

  .top {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
    height: 40px;
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: center;

      h1 {
        padding: 4px;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.text.primary};
      }
    }

    .top-back-btn {
      background-color: ${({ theme }) => theme.colors.accent};
      padding: 4px 6px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
    }
  }

  .main {
    padding: 8px;
    height: 100%;
    height: calc(100% - 40px);
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

    .combination {
      padding: 4px;
      background-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 8px;
    }
  }
`;

const Explorer = () => {
  const {
    state: { explorer },
    dispatch,
  } = GlobalContext();

  const handleBack = () => {
    dispatch({ type: 'EXPLORER_SET', payload: {} });
  };

  return (
    <StyledExplorer>
      <div className="top">
        <div className="info">
          <h1>{explorer.name}</h1>
          {explorer.mods.map((item) => (
            <img
              src={require(`../../data/images/${item.imgName}`)}
              key={`${explorer.id}-${item.imgName}`}
              alt={item.name}
              height={40}
            />
          ))}
        </div>
        <h1 className="top-back-btn" onClick={handleBack}>
          Back
        </h1>
      </div>
      <div className="main">
        {explorer.mods.map((mod, index) => (
          <div className="combination" key={`${explorer.id}-${mod.name}`}>
            <ExplorerItem mod={mod} />
          </div>
        ))}
      </div>
    </StyledExplorer>
  );
};

export default Explorer;
