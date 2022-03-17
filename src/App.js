import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import styled from 'styled-components';
import Home from './components/Home/Home';

const StyledApp = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <Home />
        {/* <Stats /> */}
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
