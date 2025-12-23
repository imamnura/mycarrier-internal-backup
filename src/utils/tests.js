import { ThemeProvider } from '@emotion/react';
import legionTheme from '@styles/legionTheme';
import React from 'react';

const wrapper = (fun, ui) =>
  fun(<ThemeProvider theme={legionTheme}>{ui}</ThemeProvider>);

export default wrapper;
