import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  width: 272px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 8px 8px 8px 0;
  border-radius: 8px;
  overflow: hidden;
`;

const Sidebar = () => {
  return <StyledSidebar>Sidebar</StyledSidebar>;
};

export default Sidebar;
