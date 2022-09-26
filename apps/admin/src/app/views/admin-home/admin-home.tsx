import { useKeycloak } from '@ha/authstore';
import { Button, Card, CardContent, CardHeader, Icon, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminService } from '../../hooks/useAdminService';
import { AppState, onServiceInfoLoad } from '../../store/app.store';
import styles from './admin-home.module.scss';

/* eslint-disable-next-line */
export interface AdminHomeProps {}

export function AdminHome(props: AdminHomeProps) {
  const adminService=useAdminService()
  const kc=useKeycloak();
  const appAction=useDispatch()
  const appState=useSelector((state:AppState)=> state.appstate)
  useEffect(()=>{
        adminService.loadServices()
  },[])
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
                <List >
                    {(appState.serviceinfo?.services||[]).map(s=><ListItem key={s?.id}  >
                        <ListItemText  primary={s?.name} secondary={s?.types?.join(',')} prefix={s?.id} />
                        <Typography variant='body2'>{s?.id}</Typography>
                    </ListItem> )}
                </List>
            </CardContent>
        </Card>

    </div>
  );
}

export default AdminHome;
