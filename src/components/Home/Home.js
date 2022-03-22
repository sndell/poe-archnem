import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModMenu from '../ModMenu/ModMenu';
import { GlobalContext } from '../../context';
import Combination from '../Combination/Combination';
import Stats from '../Stats/Stats';
import Explorer from '../../Explorer/Explorer';
import AssignedStats from '../../AssignedStats/AssignedStats';

const StyledHome = styled.div`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
  /* width: 640px; */
  display: flex;
  gap: 8px;
  height: 100vh;
  padding: 8px;
  border-radius: 8px;

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

const Home = () => {
  const {
    state: { menu, combinations, explorer },
    dispatch,
  } = GlobalContext();

  const handleOpen = () => {
    dispatch({ type: 'MENU_MOD_SET-ACTIVE', payload: true });
  };

  useEffect(() => {
    dispatch({ type: 'COMBINATIONS_GET-TREE', payload: combinations });
  }, [combinations, dispatch]);

  return (
    <StyledHome>
      {!Object.keys(explorer.combination).length > 0 ? (
        <>
          <div className="home">
            <div className="home-top">
              <div className="new-button">
                <h1 onClick={handleOpen}>Create New</h1>
              </div>
            </div>
            <div className="home-main">
              <div className="combinations-container">
                {combinations.map((item) => (
                  <Combination combination={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
          <Stats />
        </>
      ) : (
        <>
          <Explorer />
          <AssignedStats />
        </>
      )}

      {menu.mod.active && <ModMenu />}
    </StyledHome>
  );
};

export default Home;
