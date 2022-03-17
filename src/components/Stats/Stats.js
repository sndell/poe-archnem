import React from 'react';
import styled from 'styled-components';

const StyledStats = styled.div`
  height: calc(100vh - 40px);
  background-color: ${({ theme }) => theme.colors.secondary};
  /* background-color: #0e0e0f; */
  width: 240px;
  /* border-left: 2px solid ${({ theme }) => theme.colors.accent}; */
`;

const Stats = () => {
  return <StyledStats></StyledStats>;
};

export default Stats;
