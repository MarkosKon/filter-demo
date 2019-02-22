/*
  We need only the context (AppContainer) and the GlobalStyle here.
  We can omit the other stuff from gatsby-browser.js because
  the result is the same.
*/
/* eslint-disable react/jsx-filename-extension, react/prop-types */

import React from 'react';

import AppContainer from './src/components/AppContainer';
import GlobalStyle from './src/layouts/GlobalStyle';

export const wrapRootElement = ({ element }) => (
  <AppContainer>
    <GlobalStyle />
    {element}
  </AppContainer>
);
