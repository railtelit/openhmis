import { AppRoles } from '../../security';
import { useKeycloak } from '@ha/authstore';
import {  Container,
         } from '@mui/material';
import { environment } from '../../../environments/environment';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app.store';
import styles from './app-home.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AppHomeProps {}
const clientid=environment.CLIENT_ID||'react-app'
export function AppHome(props: AppHomeProps) {
  const kc=useKeycloak();
  const authState=useSelector((state:AppState)=>state.auth);
  const [userRoles,setUserRoles]=useState<string[]>([]);
  const nav=useNavigate(); 
  
  useEffect(()=>{
       const roles=kc?.resourceAccess?.[clientid].roles||[]; 
       
       setUserRoles(roles);
       if(roles.length===0){
         nav('/404');
       }else{
         nav('/selectrole')
       }
  },[])  

  return (
    <Container>
    
                <Outlet /> 
       
    </Container>
  );
}

export default AppHome;
