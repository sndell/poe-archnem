import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { GlobalContext } from '../../context';

const StyledExplorerItem = styled.div`
  ${(props) => props.assigned && 'opacity: 30%;'}

  .item {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 4px;
      color: ${({ theme }) => theme.colors.text.primary};
    }

    svg {
      margin-top: 2px;
      margin-left: 4px;
      background-color: ${({ theme }) => theme.colors.accent};
      border-radius: 2px;
      padding: 1px 1px;
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: 11px;
      cursor: pointer;
      user-select: none;
    }

    .drop {
      color: ${({ theme }) => theme.colors.text.mods.drop};
    }
    .recipie {
      color: ${({ theme }) => theme.colors.text.mods.recipie};
    }
    .boss {
      color: ${({ theme }) => theme.colors.text.mods.boss};
    }
  }

  .ready {
    h1 {
      /* background-color: ${({ theme }) => theme.colors.tertiary}; */
      /* color: ${({ theme }) => theme.colors.accent} !important; */
    }
  }

  .combination-container {
    display: flex;

    .line {
      height: auto;
      width: 1px;
      margin: 4px 0;
      border-radius: 8px;
      margin-left: 11px;
      margin-right: 11px;
      background-color: ${({ theme }) => theme.colors.text.primary};
      /* background-color: ${({ theme }) => theme.colors.accent}; */
      /* background-color: black; */
    }

    .item-combination {
    }
  }
`;

const ExplorerItem = ({ mod }) => {
  const { dispatch } = GlobalContext();
  const handleCombine = () => {
    dispatch({ type: 'ITEMS_COMBINE-OWNED', payload: mod });
  };
  return (
    <StyledExplorerItem assigned={mod.assigned} ready={mod.ready}>
      <div className={mod.ready ? 'item ready' : 'item'}>
        <img
          src={require(`../../data/images/${mod.imgName}`)}
          alt={mod.name}
          height={24}
        />
        <h1
          className={
            !mod.combination
              ? 'drop'
              : !mod.name.includes('touched')
              ? 'recipie'
              : 'boss'
          }
        >
          {mod.name}
        </h1>
        {mod.ready && <FaPlus onClick={handleCombine} />}
      </div>

      {mod.combination && (
        <div className="combination-container">
          <div className="line"></div>
          <div className="item-combination">
            {mod.combination.map((item) => (
              <ExplorerItem mod={item} key={item.name} />
            ))}
          </div>
        </div>
      )}
    </StyledExplorerItem>
  );
};

export default ExplorerItem;
