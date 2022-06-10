import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './app/app';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { AppTheme } from './app/config/theme';
import { CssBaseline } from '@mui/material';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={AppTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
);
// <StrictMode>
// </StrictMode>
