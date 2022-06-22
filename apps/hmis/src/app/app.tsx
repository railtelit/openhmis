// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { HealthPatients } from '@ha/health/patients';
// import { Route, Link, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './home/home';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import ThemeSettings from '../layouts/full-layout/customizer/ThemeSettings';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import 'react-perfect-scrollbar/dist/css/styles.css';

import RTL from '../layouts/full-layout/customizer/RTL';
import Router from '../routes/Router';



export function App() {
  const theme = ThemeSettings();
  const routing = useRoutes(Router );
  const customizer = useSelector((state:any) => state.CustomizerReducer);

  console.log(theme); 
  return (
    
      <ThemeProvider theme={theme}>
        <ToastContainer position='top-center' />   
         <RTL direction={customizer.activeDir}>
        <CssBaseline/>        
        {/* <Home></Home>                    */}
             {routing}
         </RTL>
      </ThemeProvider>
     
  );
}

export default App;
