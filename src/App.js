import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import Content from './components/Content/Content';
import Menu from './components/Menu/Menu';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Content />
      <Menu />
    </ThemeProvider>
  );
};

export default App;
