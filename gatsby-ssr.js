/* eslint-disable react/jsx-filename-extension, react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './src/layouts/theme';
import AppContainer from './src/components/AppContainer';
import GlobalStyle from './src/layouts/GlobalStyle';
import 'normalize.css';
import 'typeface-playfair-display';
import 'typeface-open-sans';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <AppContainer>
      <GlobalStyle />
      {element}
    </AppContainer>
  </ThemeProvider>
);
