
import { KeycloakInstance } from 'keycloak-js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onLoadUserInfo, onProfileLoad, onReady, setUserRoles } from '../authstore';
import { KeycloakContext } from '../keycloak.context';
import styles from './keycloakprovider.module.scss';

/* eslint-disable-next-line */
export interface KeycloakproviderProps {
    keycloak: KeycloakInstance, children:any,
    onReady?:(response:any)=>Promise<void>
}
 
export function KeycloakProvider({keycloak,...props}: KeycloakproviderProps) {
  const [ready,setReady]=useState(false);
  const authAction=useDispatch(); 

  useEffect(()=>{
      keycloak.onTokenExpired=()=>{
           keycloak.updateToken(10).then(v=>console.log(`Token Refreshed`))
      }      
        keycloak.onReady=(success=>{
           if(success){
              //console.log(keycloak.tokenParsed)
              authAction(setUserRoles(keycloak.tokenParsed?.realm_access?.roles||[] )); 
              if(keycloak.token)
                authAction(onReady({token:keycloak.token}));                
              setReady(true); 
              keycloak.loadUserInfo().then(value=>{                 
                 authAction(onLoadUserInfo(value))
               }); 
               keycloak.loadUserProfile().then((profile)=>{
                 //console.log(profile)
                authAction(onProfileLoad(profile))
                if(props.onReady){
                    //console.log( 'Ready token ', keycloak.token)
                    props.onReady(success)
                }
              }); 
           }
        }); 
        keycloak.init({onLoad:'login-required'})
  },[])
  return (
    <KeycloakContext.Provider value={keycloak} >   
        { ready ? props.children :null}
    </KeycloakContext.Provider>
  );
}

export default KeycloakProvider;
