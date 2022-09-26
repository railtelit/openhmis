// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider, useSelector, useStore } from 'react-redux';
import { AppThemeProvider } from '@ha/apptheme';
import { AppBar, Box, Button, Card, CardContent, Container, CssBaseline, Typography } from '@mui/material';
import styles from './app.module.scss'; 
import { AuthStateInterface, KeycloakProvider, useKeycloak,  } from '@ha/authstore';
import { KeyCloak } from './keycloak';
import { AppState, AppStoreType } from './store/app.store';
import AppToolbar from '../components/app-toolbar/app-toolbar';
import { Outlet, useRoutes } from 'react-router-dom';
import { appRoutes } from './app.routes';
import { useEffect } from 'react';
export function App() {  
   const authState=useSelector((state:AppState)=>state.auth);
   const routes =useRoutes(appRoutes)   
  return (    
      
      <KeycloakProvider keycloak={KeyCloak} >      
      <AppThemeProvider>
            <CssBaseline/>
            <Container>
                        <AppToolbar />
                              {routes}
                        <Outlet/>
            </Container>
      </AppThemeProvider>    
        </KeycloakProvider>
    
  );
}

export default App;
