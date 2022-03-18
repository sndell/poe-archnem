import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import styled from 'styled-components';
import Home from './components/Home/Home';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;

  header {
    width: 100vw;
    height: 40px;
    background-color: red;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <StyledApp>
        <header />
        <Home />
        {/* <Stats /> */}
        <header />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
