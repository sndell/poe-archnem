import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';
import Explorer from '../explorer/Explorer';
import Combinations from '../combinations/Combinations';
import ModMenu from '../modmenu/ModMenu';

const StyledHome = styled.div`
  width: 1120px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 8px 0 8px 8px;
  border-radius: 8px;
  overflow: hidden;
`;
const Home = () => {
  const {
    state: { refresh, combinations, explorer, menu, items },
    dispatch,
  } = GlobalContext();

  useEffect(() => {
    if (refresh) {
      dispatch({
        type: 'COMBINATIONS_CALCULATE',
        payload: combinations,
      });
    }
  }, [refresh, combinations, dispatch]);

  useEffect(() => {
    window.localStorage.setItem('combinations', JSON.stringify(combinations));
    window.localStorage.setItem('items', JSON.stringify(items));
  }, [combinations, items]);

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
