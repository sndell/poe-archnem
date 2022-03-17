import React from 'react';
import styled from 'styled-components';
import ModMenu from '../ModMenu/ModMenu';
import { GlobalContext } from '../../context';
import Combination from '../Combination/Combination';
import Stats from '../Stats/Stats';

const StyledHome = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  /* width: 640px; */

  .home {
    display: flex;
    flex-direction: column;

    .home-top {
      height: 40px;
      display: flex;
      justify-content: end;
      align-items: center;
      padding: 0 8px;
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
      height: calc(100vh - 40px);
      display: flex;

      .combinations-container {
        width: 640px;
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
    state: { menu, combinations },
    dispatch,
  } = GlobalContext();

  const handleOpen = () => {
    dispatch({ type: 'MENU_SET-ACTIVE', payload: true });
  };

  return (
    <StyledHome>
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
          <Stats />
        </div>
      </div>

      {menu.active && <ModMenu />}
    </StyledHome>
  );
};

export default Home;
