import { useKeycloak } from '@ha/authstore';
import { List, Card, ListItem, ListItemButton, ListItemText, Typography, Avatar, IconButton, Icon, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app.store';
import styles from './select-role.module.scss';
import { environment } from '../../../environments/environment';
import { AppRoles, RoleMaster } from '../../security';
import { useNavigate } from 'react-router-dom';
import { setState, useApiState } from '@ha/common';
/* eslint-disable-next-line */
export interface SelectRoleProps {}
const clientid=environment.CLIENT_ID||'react-app'

const roles=RoleMaster
export function SelectRole(props: SelectRoleProps) {
  const kc=useKeycloak();
  const authState=useSelector((state:AppState)=>state.auth);
  const [userRoles,setUserRoles]=useState<string[]>([]);
  const nav=useNavigate()
  const workerRoles=useApiState<any[]>('roles',{initialState:[]});
  const dispatch=useDispatch()
  useEffect(()=>{
       const roles=kc?.resourceAccess?.[clientid]?.roles||[]
       setUserRoles(roles.filter(role=> AppRoles[role]!==undefined ))
  },[])  
  function getRoleInfo(role:string){
       console.log(`CHecking ROles `,workerRoles.state);
       return role 
  }
  function initRoleNavigation(role:string){

      const workerRole = workerRoles.state?.find(r=> r?.role=== role ); 
      if(workerRole){
          dispatch(setState( {workerRole} ))
      }
      nav(AppRoles[role].path)
  }
  return (
    <div className={styles['container']}>
        <Grid container justifyContent={'space-between'} >
            <Typography variant='h3'>Select Role</Typography>
            <IconButton aria-label="Logout" color='error'  onClick={()=>{
                kc?.logout();
            }}>
              <Icon>logout</Icon>
            </IconButton>
        </Grid>
       <List>
                        {userRoles.map((role=> 
                        <Card key={role} >
                        <ListItem  >
                          <Avatar/>
                          <ListItemButton  onClick={()=>{
                                initRoleNavigation(role)
                          }} ><ListItemText prefix={'User'}  
                                primary={ <Typography>{role?.toUpperCase()}</Typography> } 
                                secondary={ workerRoles.state && workerRoles.state?.find(r=> r.role.toUpperCase() === role?.toUpperCase() )?.location?.locationname }  
                                >
                              </ListItemText>
                          </ListItemButton>  
                          <IconButton onClick={()=>nav(AppRoles[role].path)} ><Icon>arrow_right</Icon></IconButton>                          
                        </ListItem>  
                        {/* {JSON.stringify(workerRoles)} : {getRoleInfo(role)} */}
                        </Card>                        

                        ))}
                  </List>
    </div>
  );
}

export default SelectRole;
