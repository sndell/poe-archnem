import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context';

const StyledStats = styled.div`
  /* height: calc(100vh - 40px); */
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  /* background-color: #0e0e0f; */
  width: 240px;
  border-radius: 8px;
  /* border-left: 2px solid ${({ theme }) => theme.colors.accent}; */
`;

const Stats = () => {
  const {
    state: { needed, combinations },
    dispatch,
  } = GlobalContext();

  useEffect(() => {
    dispatch({ type: 'NEEDED_GET', payload: combinations });
  }, [combinations, dispatch]);

  return <StyledStats></StyledStats>;
};

export default Stats;
