// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppThemeProvider } from '@ha/apptheme';
import { KeycloakProvider } from '@ha/authstore';
import { Container, createTheme, CssBaseline, ThemeProvider, Typography, useTheme } from '@mui/material';
import { Outlet, useRoutes } from 'react-router-dom';
import styles from './app.module.scss';

import { KeycloakSecurity } from './keycloak';
import { AppRoutes } from './routes';
import  Axios  from 'axios';
import { environment } from '../environments/environment';
import {KeycloakSecurity as KeyCloak}  from './keycloak'
import { useDispatch } from 'react-redux';
import { setLoading } from './app.store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const routes=useRoutes(AppRoutes); 
  const appAction = useDispatch();

  Axios.defaults.baseURL=environment.API_ENDPOINT;
  Axios.interceptors.request.use(async (config)=>{            
    appAction(setLoading(true)); 
    if(KeyCloak.isTokenExpired(6)){
          await KeyCloak.updateToken(6)
    }
    config.headers={...config.headers,'Authorization':`Bearer ${KeyCloak.token}`}
    return config  
},(err)=>{
    
    appAction(setLoading(false)); 
    toast.error(`Request Error :  ${err?.message} `); 
    throw err 
});
Axios.interceptors.response.use((config)=>{
    //console.log('Response ok')   
    appAction(setLoading(false))            
    return config 
},err=>{
   appAction(setLoading(false));
   toast.error(err?.message,{}); 
   throw err
});

 const theme=useTheme();
 const composeTheme = createTheme( theme,   )

  return (
      
      <KeycloakProvider keycloak={KeycloakSecurity}>
          <AppThemeProvider  >
                <CssBaseline/>      
                <ToastContainer  position='top-center' hideProgressBar={true} />
                <Container sx={{pt:3}}>
                    {routes}
                </Container>
                <Outlet/>
               
          </AppThemeProvider>    
      </KeycloakProvider>
    
  );
}

export default App;
