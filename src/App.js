import { useEffect } from 'react';
import { GlobalContext } from './context';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import Content from './components/Content/Content';

const App = () => {
  const {
    state: { mods },
    dispatch,
  } = GlobalContext();

  useEffect(() => {
    console.log(mods);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Content />
    </ThemeProvider>
  );
};

export default App;
