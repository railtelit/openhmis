import { useKeycloak } from '@ha/authstore';
import { AppBar, Button, Container, Grid, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate, useRoutes } from 'react-router-dom';
import { adminRoutes } from './admin.routes';
import styles from './hipu-admin.module.scss';

/* eslint-disable-next-line */
export interface HipuAdminProps {}



export function HipuAdmin(props: HipuAdminProps) {
  const AdminRoutes=useRoutes(adminRoutes);
  const nav=useNavigate();
  const kc=useKeycloak();
  useEffect(()=>{
      nav('dashboard')
  },[])
  return (
    <Container>
        <Toolbar prefix='O' >
            <Grid container justifyContent={'space-between'}>
                <Typography >Open-Arogya</Typography>
                <IconButton onClick={()=>kc?.logout()}><Icon>logout</Icon></IconButton>
            </Grid>
        </Toolbar>
       {AdminRoutes}
       <Outlet />
    </Container>    
  );
}

export default HipuAdmin;
