import { SelectOptions } from '@ha/shared-ui';
import { Alert, AlertTitle, Box, Button, Card, Container, FormControl, FormLabel, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useManageServiceAdmin } from '../../hooks/useManageServiceAdmin';
import { AppState, ServiceInterface } from '../../store/app.store';
import { AdminUserInterface, ServiceMasterInterface } from '../../store/interfaces';
import styles from './manage-admin.module.scss';

/* eslint-disable-next-line */
export interface ManageAdminProps {}


//Intention : Create AdminUser for Service 

export function ManageAdmin(props: ManageAdminProps) {
  const nav=useNavigate();
  const appState=useSelector((state:AppState)=>state.appstate); 
  const [serviceMaster,setServiceMaster]=useState<ServiceMasterInterface >();
  const manageService=useManageServiceAdmin();
  const [adminUser,setAdminUser]=useState<AdminUserInterface>();
  const [initError,setInitError]=useState<{message:string}|null>(null)
  const [serviceState,setServiceState]= useState<ServiceMasterInterface>() 
  const [districtOptions,setDistrictOptions]=useState<any[]>([])
  function initService(){
     if(!appState.currentService){
         nav('/');
         return ;
      };
      setInitError(null)
      manageService.initializeService(appState.currentService).then(res=>{
                setServiceMaster(res);
                setServiceState(res);
                manageService.getServiceAdmin({serviceid:appState.currentService?.id||'0'}).then(res=>{
                          setAdminUser(res)
                }); 
                if(res?.stateCode){
                         selectState(res?.stateCode)
                }
      }).catch(err=>{
                setInitError(err)
      } )
  }
  useEffect(()=>{
          initService();
  },[]);

  function selectState(stateCode:string){
          //if(serviceMaster)
               console.log(serviceMaster)
               setServiceState((state:any)=>(  !state? {...serviceMaster,stateCode}: {...state,stateCode} )); 
     
          manageService.loadDistricts(stateCode).then(list=>{
               console.log(list);
               setDistrictOptions(list)
          })
  }
  const RetryBox=()=><Grid container justifyContent={'center'} p={5}>
     
          <Stack>               
               <Alert color='error' ><AlertTitle title='Error' /><Typography> {initError?.message} </Typography></Alert>               
               <Button onClick={()=>initService()} color='error' >RETRY</Button>
          </Stack>
  </Grid>
  return (
    <div className={styles['container']}>
         <Grid container justifyContent={'end'}> <Button onClick={()=>nav('/')} >BACK</Button> </Grid>

         <Container>
               {initError? <RetryBox /> : 
                    <Card>    
                                           
                          <Grid container alignItems={'center'} spacing={2}>
                              <Grid item md={4}> ServiceId: {serviceMaster?.serviceid} </Grid>
                              <Grid item md={4}> Name: {serviceMaster?.name} </Grid>
                              <Grid item md={4}> UserName: {adminUser?.username} </Grid>
                              <Grid item md={3}>
                                   <FormControl fullWidth>
                                        <FormLabel>State</FormLabel>                                         
                                             <Select disabled={adminUser?.stateCode} 
                                                       fullWidth value={ serviceState?.stateCode||''} onChange={(e)=>{
                                                       console.log('query',e.target.value)
                                                       selectState(e.target.value as string)
                                             }} >
                                                  {appState.statesMaster.map(o=> <MenuItem  key={o?.code}  value={o?.code}> {o?.name} </MenuItem>
                                                       )}
                                             </Select>
                                       
                                   </FormControl>
                              </Grid>
                              <Grid item md={3}>
                                             <FormControl fullWidth>                                                   
                                                  <FormLabel>District</FormLabel>
                                                  <Select disabled={adminUser?.stateCode} 
                                                       value={serviceState?.districtCode||''} 
                                                       onChange={({target:{value}})=>{
                                                            setServiceState((state:any)=>({...state,districtCode:value||''}))
                                                       }}>
                                                       {districtOptions.map(o=>
                                                            <MenuItem key={o?.code} value={o?.code} > {o?.name}</MenuItem>)}
                                                  </Select>
                                             </FormControl>
                              </Grid>
                          </Grid>
                         <Grid container p={3} justifyContent={'center'} >                                                            
                          {!adminUser?.serviceid?
                          <Button disabled={!serviceState?.stateCode} onClick={()=>{
                                   if(serviceState)
                                        manageService.createServiceAdminUser(serviceState).then(res=>{
                                                   setAdminUser(res)
                                                   toast.success(`Userid Created : ${res.username} `)
                                        })
                          }} variant='contained'>CREATE SERVICE ADMIN</Button>:
                             <Typography color={'green'}>Active</Typography>  }
                         </Grid>
                    </Card>
               }
         </Container>
    </div>
  );
}

export default ManageAdmin;
