import { useKeycloak } from '@ha/authstore';
import { Button, Card, CardContent, CardHeader, Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdminService } from '../../hooks/useAdminService';
import { AppState,  ServiceInterface, setCurrentService } from '../../store/app.store';
import styles from './admin-home.module.scss';

/* eslint-disable-next-line */
export interface AdminHomeProps {}

export function AdminHome(props: AdminHomeProps) {
  const adminService=useAdminService()
  const kc=useKeycloak();
  const appAction=useDispatch()
  const appState=useSelector((state:AppState)=> state.appstate); 
  const nav=useNavigate()
  const [homeState,setHomeState]=useState({isbreathing:false});
   async function homeInit(){
         const serviceInfo = await  adminService.loadServices(); 
     
        await adminService.loadStateMaster();
        
        await adminService.checkHeartbeat().then(res=>{
                if(res?.status==='UP'){
                     setHomeState((state)=>({...state,isbreathing:true}))
                }else{
                    
                    toast.error(`bridge Not UP`)
                }
        })
   }
  useEffect( ()=>{
        homeInit();
  },[]);
  function initManageAdmin(service:ServiceInterface){
        // 
        appAction(setCurrentService(service));
        nav('/manage-admin')
  }
  return (
    <div className={styles['container']}>
            
        <Card>            
            <CardHeader subheader={appState.serviceinfo?.bridge?.name} title={<Typography variant='h3'>Repository Bridge</Typography>}  />
            <CardContent>
                <Stack direction={'row'} alignItems={'center'} >
                    <Icon>link</Icon> 
                    <Typography variant='body2'  > 
                           {appState.serviceinfo?.bridge?.url}
                    </Typography>
                    <Icon>{homeState.isbreathing?'check':'times'}</Icon>
                </Stack>
            </CardContent>
        </Card>
        <Card>           
            <CardHeader  subheader={`Total:`+appState.serviceinfo?.services?.length} 
                title={
                    <Grid container justifyContent={'space-between'} >
                        <Typography variant='h3'>Services</Typography>
                        <IconButton onClick={()=>{
                                adminService.loadServices();
                        }} ><Icon>refresh</Icon></IconButton>
                    </Grid>
                } />                          
            <CardContent >                
                <List >
                    {(appState.serviceinfo?.services||[]).map(s=><ListItem key={s?.id}   sx={{padding:0}} >
                        <ListItemButton>
                        <ListItemText color='blue'
                         onClick={()=>initManageAdmin(s)}
                         primary={s?.name} secondary={s?.types?.join(',')} prefix={s?.id} />
                        <Typography variant='body2'>{s?.id}</Typography>                                                
                        </ListItemButton>
                    </ListItem> )}
                </List>
            </CardContent>
        </Card>

    </div>
  );
}

export default AdminHome;
