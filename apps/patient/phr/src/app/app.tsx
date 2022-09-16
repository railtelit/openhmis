// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppThemeProvider } from '@ha/apptheme';
import { LanguageSelector } from '@ha/shared-ui';
import { Accordion, Button, Card, CardContent, Container, createTheme, CssBaseline, Grid, ThemeProvider, Typography, TypographyProps } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Routes, useNavigate, useRoutes } from 'react-router-dom';
import styles from './app.module.scss';
import { AuthContext, AuthContextInterface } from './AuthProvider';
import { APP_ROUTES } from './routes';
import ReCaptcha  from 'react-google-recaptcha'
import { environment } from '../environments/environment';
import { Provider } from 'react-redux';
import { appStore } from './store/app.store';
import { useApiService } from './hooks/useApiService';


export function App() {
   const theme=createTheme(); 
   const routes = useRoutes(APP_ROUTES); 
   const navigate = useNavigate();
   const auth=useContext(AuthContext);
   const {t,i18n}=useTranslation(); 
   const [authStore,setAuthStore]=useState<AuthContextInterface>({})
   useEffect(()=>{
         navigate('login');
         // Load Cert ; 
   },[]); 
   //const apiService=useApiService(); 
  return (    
<Provider store={appStore}>
               <AppThemeProvider>
  
                      <CssBaseline/>
                        <Container sx={{padding:2}} >
                          <Grid alignItems={'center'} justifyContent={'space-between'} >
                          <img  src='assets/logo/openhmis.png' alt='HIND' width={90} />
                          <Typography variant='caption' >Version:0.3</Typography>
                          </Grid>
                          {/* <img  src='assets/logo/hindilogo1.png' alt='HIND' width={150} /> */}
                        </Container>
  
                      <AuthContext.Provider value={authStore} >
                        {routes}
                        <AuthContext.Consumer   >
                          {(value)=>
                            !value.captcha?  <Grid container justifyContent={'center'}>
                                <ReCaptcha onChange={(token)=>{
                                    setAuthStore((value)=>({...value,captcha:token}))
                                }}  sitekey={environment.SITE_KEY} />
                            </Grid> : <></>
                          }
                        </AuthContext.Consumer>
                      </AuthContext.Provider>
                      <Grid sx={{position:'fixed',right:0,bottom:0}} container justifyContent={'end'}>
                          <LanguageSelector onChange={(v)=>{
                               console.log(`Changing to ${v} `)
                              i18n.changeLanguage(v);
                          }} />
                      </Grid>
  
  
    </AppThemeProvider>
</Provider>
  );
}

export default App;
