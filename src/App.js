import styled from 'styled-components';
import Home from './components/home/Home';
import Sidebar from './components/sidebar.js/Sidebar';
const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  height: 100vh;
`;

const App = () => {
  return (
    <StyledApp>
      <Home />
      <Sidebar />
    </StyledApp>
  );
};

export default App;
