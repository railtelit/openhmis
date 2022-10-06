import { useKeycloak } from '@ha/authstore';
import { List, Card, ListItem, ListItemButton, ListItemText, Typography, Avatar, IconButton, Icon } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../app.store';
import styles from './select-role.module.scss';
import { environment } from '../../../environments/environment';
import { AppRoles, RoleMaster } from '../../security';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface SelectRoleProps {}
const clientid=environment.CLIENT_ID||'react-app'

const roles=RoleMaster
export function SelectRole(props: SelectRoleProps) {
  const kc=useKeycloak();
  const authState=useSelector((state:AppState)=>state.auth);
  const [userRoles,setUserRoles]=useState<string[]>([]);
  const nav=useNavigate()
  useEffect(()=>{
       const roles=kc?.resourceAccess?.[clientid]?.roles||[]
       setUserRoles(roles.filter(role=> AppRoles[role]!==undefined ))
  },[])  
  return (
    <div className={styles['container']}>
        <Typography variant='h3'>Select Role</Typography>
       <List>
                        {userRoles.map((role=> 
                        <Card key={role} >
                        <ListItem  >
                          <Avatar/>
                          <ListItemButton  onClick={()=>{
                                nav(AppRoles[role].path)
                          }} ><ListItemText prefix={'User'}  
                                primary={ <Typography>{role?.toUpperCase()}</Typography> }  >
                              </ListItemText>
                          </ListItemButton>  
                          <IconButton onClick={()=>nav(AppRoles[role].path)} ><Icon>arrow_right</Icon></IconButton>                          
                        </ListItem>
                        </Card>                        
                        
                        ))}
                  </List>
    </div>
  );
}

export default SelectRole;
