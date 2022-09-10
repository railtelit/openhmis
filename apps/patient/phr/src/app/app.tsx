// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Accordion, Button, Card, CardContent, createTheme, CssBaseline, ThemeProvider, Typography, TypographyProps } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { AppThemeProvider } from 'libs/apptheme/src';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { Outlet, Routes, useNavigate, useRoutes } from 'react-router-dom';
import styles from './app.module.scss';
import { AuthContext } from './AuthProvider';
import { APP_ROUTES } from './routes';


export function App() {
   const theme=createTheme(); 
   const routes = useRoutes(APP_ROUTES); 
   const navigate = useNavigate();
   const auth=useContext(AuthContext);
   useEffect(()=>{
         navigate('login')
   },[])
  return (    
           <AppThemeProvider>
                  <CssBaseline/>                 
                  <AuthContext.Provider value={auth} >
                    {routes}                    
                  </AuthContext.Provider>
           </AppThemeProvider>
    
  );
}

export default App;
