import { useKeycloak } from '@ha/authstore';
import { AppBar, Button, Container, Grid, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import {   adminContext, adminStore } from '../admin.store';
import { adminRoutes } from './admin.routes';
import styles from './hipu-admin.module.scss';

/* eslint-disable-next-line */
export interface HipuAdminProps {}

export const HIPAdminHome=()=><div>

</div>

export function HipuAdmin(props: HipuAdminProps) {
  const AdminRoutes=useRoutes(adminRoutes);
  const nav=useNavigate();
  const kc=useKeycloak();
  const state = useSelector((state:any)=>state)
  // useEffect(()=>{
  //     nav('dashboard')
  // },[])
  return (
    <Container>
        <Toolbar prefix='O' >
            <Grid container justifyContent={'space-between'}>
                <Typography >Open-Arogya {state?.auth?.userInfo?.preferred_username} </Typography>
                <IconButton onClick={()=>kc?.logout()}><Icon>logout</Icon></IconButton>
            </Grid>
        </Toolbar>
      
            {AdminRoutes}
            <Outlet/>
      
    </Container>    
  );
}

export default HipuAdmin;
