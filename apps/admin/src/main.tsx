
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

import { appStore } from './app/store/app.store';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
    
    root.render(               
        <Provider store={appStore}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </Provider>                
    );
 