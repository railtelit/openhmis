import { Button, Container, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AadhaarRegistration from './aadhaar-registration/aadhaar-registration';
import styles from './register.module.scss';

/* eslint-disable-next-line */
export interface RegisterProps {}


export function Register(props: RegisterProps) {
  const [registerState,setRegisterState]=useState({}); 
  const {t,i18n} = useTranslation()
  const navigate=useNavigate(); 
  const [method,setMethod]=useState<string|null>(null); 
  const methodTypes={
        aadhaar:{},documentid:{}
  }
  const methodViews:any={
    aadhaar:<AadhaarRegistration/>
  }
  useEffect(()=>{
      //Check if Already Logged In : 
      if(localStorage.getItem('token')){
            navigate('/account');
      }
  },[])
  return (
    <Container>
              <Grid container  justifyContent={'space-between'}> 
                 <Grid item>
                      <Typography variant='h3' >{t('registration.title')}</Typography>
                 </Grid>
                 <Button onClick={()=>setMethod(null)} sx={{visibility:method==null?'hidden':'visible'}} >Change Method</Button> 
             </Grid>
             {method===null?
              <Grid container p={3}  justifyContent={'center'}>
                     <List>                        
                        <Typography textAlign={'center'} >Register Using</Typography>
                         {Object.keys(methodTypes).map(m=> <ListItem key={m}>
                            <Button fullWidth variant='outlined' onClick={()=>{
                                setMethod(m)
                            }} > {t(`registration.method.${m}.title`)} </Button>
                         </ListItem> )}
                         <Divider/>
                         <ListItem>
                            <Button fullWidth onClick={()=>navigate('/login')} variant='outlined' color={'error'}>CANCEL</Button>
                         </ListItem>
                     </List>
              </Grid> 
              : methodViews[method]
            }
    </Container>
  );
}

export default Register;
