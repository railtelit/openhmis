// eslint-disable-next-line @typescript-eslint/no-unused-vars


import { HealthPatients } from '@ha/health/patients';
import { Route, Link, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './home/home';
import 'react-toastify/dist/ReactToastify.css';


export function App() {
  return (
    <>      
      <div />   
      <ToastContainer position='top-center'  />   
        <Home></Home>     
    </>
  );
}

export default App;
