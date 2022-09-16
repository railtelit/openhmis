import { Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes, useNavigate, useRoutes } from 'react-router-dom';
import HomeHeader from '../../../components/home-header/home-header';
import { useAccountService } from '../../hooks/accountService';
import { AppState } from '../../store/app.store';
import { HOME_ROUTES } from './home-routes';
import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const authState=useSelector((state:AppState)=>state.auth); 
  const navigate=useNavigate();
  const account=useAccountService(); 
  const routes=useRoutes(HOME_ROUTES);
  useEffect(()=>{
        account.loadProfile();
  },[]); // Load Account 
  return (
    <Container>      
      <div className={styles['container']}>
       
        <HomeHeader />
        <Stack>HealthId : {authState.userAccount?.healthId} </Stack>
        {/* {JSON.stringify(authState.userAccount)} */}
        {routes}
        <Outlet></Outlet>
      </div>
    </Container>
  );
}

export default Home;
