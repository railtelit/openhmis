import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { AppStore } from './app/app.store';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={AppStore}>
    <BrowserRouter>

      <App />
    </BrowserRouter>
    </Provider>
  
);
