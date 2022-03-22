import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import OwnedMenu from '../OwnedMenu/OwnedMenu';
import StatsItem from './StatsItem';

const StyledStats = styled.div`
  /* height: calc(100vh - 40px); */
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary};
  /* background-color: #0e0e0f; */
  min-width: 272px;
  border-radius: 8px;
  overflow: hidden;
  /* border-left: 2px solid ${({ theme }) => theme.colors.accent}; */

  .stats-main {
    overflow-y: auto;
    .drop,
    .recipie,
    .drop {
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

  .stats-bottom {
    min-height: 40px;
    border-top: 2px solid ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    justify-content: center;
    padding: 0 8px;
    align-items: center;

    .stats-bottom-button {
      background-color: ${({ theme }) => theme.colors.accent};
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 8px;
    }

    /* .filter {
      display: flex;
      h1 {
        color: ${({ theme }) => theme.colors.text.primary};
      }
    } */
  }
`;

const Stats = () => {
  const {
    state: { items, combinations, menu },
    dispatch,
  } = GlobalContext();

  useEffect(() => {
    dispatch({ type: 'ITEMS_GET-NEEDED', payload: combinations });
  }, [combinations, dispatch]);

  const handleOpen = () => {
    dispatch({ type: 'MENU_OWNED_SET-ACTIVE', payload: true });
  };

  return (
    <StyledStats>
      <div className="stats-main">
        <div className="drop">
          {items.needed
            .filter((item) => !item.combination)
            .map((item) => (
              <StatsItem item={item} key={`needed-${item.name}`} />
            ))}
        </div>
        <div className="recipie">
          {items.needed
            .filter(
              (item) => item.combination && !item.name.includes('touched')
            )
            .map((item) => (
              <StatsItem item={item} key={`needed-${item.name}`} />
            ))}
        </div>
        <div className="boss">
          {items.needed
            .filter((item) => item.name.includes('touched'))
            .map((item) => (
              <StatsItem item={item} key={`needed-${item.name}`} />
            ))}
        </div>
      </div>
      <div className="stats-bottom">
        <h1 className="stats-bottom-button" onClick={handleOpen}>
          Owned
        </h1>
        {/* <div className="filter">
          <h1>Drop only</h1>
          <input type="checkbox" name="" id="" />
        </div> */}
      </div>
      {menu.owned.active && <OwnedMenu />}
    </StyledStats>
  );
};

export default Stats;
