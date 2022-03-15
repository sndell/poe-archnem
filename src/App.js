import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import Content from './components/Content/Content';
import Menu from './components/Menu/Menu';
import Stats from './components/Stats/Stats';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledApp>
        <Content />
        <Stats />
      </StyledApp>
      <Menu />
    </ThemeProvider>
  );
};

export default App;
