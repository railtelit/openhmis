import { useKeycloak } from '@ha/authstore';
import { Button, Card, CardContent, CardHeader, Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  useEffect(()=>{
        adminService.loadServices()
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
                </Stack>
            </CardContent>
        </Card>
        <Card>            
            <CardHeader subheader={`Total:`+appState.serviceinfo?.services?.length} title={<Typography variant='h3'>Services</Typography>}  />
            <CardContent>
                <Grid justifyContent={'end'} >
                        <IconButton onClick={()=>{
                                adminService.loadServices();
                        }} ><Icon>refresh</Icon></IconButton>
                </Grid>
                <List >
                    {(appState.serviceinfo?.services||[]).map(s=><ListItem key={s?.id}  >
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
