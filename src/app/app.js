import React from 'react';
import { Reset } from 'styled-reset';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Routes from './routes';

const theme = {
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', 'Noto Sans KR', sans-serif !important;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: inherit;
  }
`;

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
