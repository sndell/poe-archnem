import React from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import Explorer from '../explorer/HomeExplorer';
import Combinations from '../combinations/Combinations';
import ModMenu from '../modmenu/ModMenu';

const StyledHome = styled.div`
  width: 800px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 8px 0 8px 8px;
  border-radius: 8px;
  overflow: hidden;
`;
const Home = () => {
  const {
    state: { explorer, menu },
    // dispatch,
  } = GlobalContext();
  return (
    <StyledHome>
      {explorer.id ? (
        <Explorer />
      ) : (
        <>
          <Combinations />
          {menu.mod.active && <ModMenu />}
        </>
      )}
    </StyledHome>
  );
};

export default Home;
