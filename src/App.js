import GlobalStyle from './styles/Global';
import styled from 'styled-components';
import ModSelector from './Components/ModSelector/ModSelector';

const StyledApp = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <ModSelector />
    </StyledApp>
  );
};

export default App;
