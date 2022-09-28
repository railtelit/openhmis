import { Box, Button, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store/app.store';
import styles from './manage-admin.module.scss';

/* eslint-disable-next-line */
export interface ManageAdminProps {}


//Intention : Create AdminUser for Service 

export function ManageAdmin(props: ManageAdminProps) {
  const nav=useNavigate();
  const appState=useSelector((state:AppState)=>state.appstate); 
  useEffect(()=>{
      if(!appState.currentService){
         nav('/');
      }
  },[])
  return (
    <div className={styles['container']}>
         <Grid container justifyContent={'end'}> <Button onClick={()=>nav('/')} >BACK</Button> </Grid>

         <Container>
              <Box>
                   {JSON.stringify(appState.currentService)}
              </Box>
         </Container>
    </div>
  );
}

export default ManageAdmin;
