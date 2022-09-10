import { configStore } from 'libs/apptheme/src';
import { StrictMode, Suspense } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={configStore} >
  
  <StrictMode>    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
    
  </Provider>
);
