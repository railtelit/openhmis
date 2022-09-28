// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {   useDispatch, useSelector  } from 'react-redux';
import { AppThemeProvider } from '@ha/apptheme';
import {   Backdrop,  Card, CardContent, CircularProgress, Container, CssBaseline, LinearProgress, Typography } from '@mui/material';
import styles from './app.module.scss'; 
import { AuthStateInterface, KeycloakProvider  } from '@ha/authstore';
import { KeyCloak } from './keycloak';
import { AppState, AppStoreType, setLoading } from './store/app.store';
import AppToolbar from '../components/app-toolbar/app-toolbar';
import { Outlet, useRoutes } from 'react-router-dom';
import { appRoutes } from './app.routes';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAdminService } from './hooks/useAdminService';
import  Axios  from 'axios';
export function App() {  
   const authState=useSelector((state:AppState)=>state.auth);
   const appState=useSelector((state:AppState)=>state.appstate);
   const routes =useRoutes(appRoutes);
   const adminService=useAdminService();
   const appAction=useDispatch()
   useEffect(()=>{      
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
 
},[])
  return (    
      
        <KeycloakProvider keycloak={KeyCloak} onReady={async (v)=>{
              // adminService.loadServices();
      }} >    
      <ToastContainer position='top-center' hideProgressBar={true}   ></ToastContainer>
             
      <AppThemeProvider>
            <CssBaseline/>
            <Container>
                        <AppToolbar />
                        <LinearProgress sx={{display:appState.isLoading?'block':'none'}} />
                              {routes}
                        <Outlet/>
              <Backdrop open={appState.isLoading} >
                        <Card>                                                                
                                    <CircularProgress color='info'  />
                                     
                        </Card>
              </Backdrop>    
            </Container>
      </AppThemeProvider>    
        </KeycloakProvider>
    
  );
}

export default App;
