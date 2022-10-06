// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppThemeProvider } from '@ha/apptheme';
import { KeycloakProvider } from '@ha/authstore';
import { Container, CssBaseline, Typography } from '@mui/material';
import { Outlet, useRoutes } from 'react-router-dom';
import styles from './app.module.scss';
import AppTopbar from './components/app-topbar/app-topbar';
import { KeycloakSecurity } from './keycloak';
import { AppRoutes } from './routes';
 

export function App() {
  const routes=useRoutes(AppRoutes)
  return (
      
      <KeycloakProvider keycloak={KeycloakSecurity}>
          <AppThemeProvider  >
                <CssBaseline/>      
                   
                <Container sx={{pt:3}}>
                    {routes}
                </Container>
                <Outlet/>
          </AppThemeProvider>    
      </KeycloakProvider>
    
  );
}

export default App;
