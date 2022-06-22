import {  Suspense } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './app/app';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import Spinner from './views/spinner/Spinner';


const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(  
    
      <Provider store={configureStore()}>
        <Suspense fallback={<Spinner/>}>

      <BrowserRouter>
        <App />
      </BrowserRouter>
        </Suspense>
   
      </Provider>
    
);
// <StrictMode>
// </StrictMode>
