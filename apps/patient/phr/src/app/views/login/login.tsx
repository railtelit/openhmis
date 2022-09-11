import { TabPanel } from '@mui/lab';
import { Button, Card, CardContent, Container, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthMethods, AuthType, } from '../../AuthProvider';
import { useApiService } from '../../hooks/useApiService';
import styles from './login.module.scss';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const auth=useContext(AuthContext); 
  const [loginMethod,setLoginMethod]=useState<AuthType>("mobile"); 
  const loginForm=useForm({defaultValues:{initValue:''}})
  const apiservice=useApiService();  
  const navigate=useNavigate();
  const {t,i18n} = useTranslation(); 
  
  return (
    
    <Container>
      <div className={styles['container']}>
        <Card>          
          <CardContent>
            <Grid container spacing={5}>
                <Grid item md={12}>
                    <h1>{t('login.title')}</h1>
                </Grid>
                <Grid item container justifyContent={'center'}>
                    <ToggleButtonGroup exclusive value={loginMethod}  onChange={(e,value)=>setLoginMethod(value)}>
                        {Object.keys(AuthMethods).map( (k)=>
                             <ToggleButton key={k} value={k} >{t(`authtype.inputLabel.${k}`)} </ToggleButton>
                           )}
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={12} justifyContent={'center'} >
                     
                      <Stack width={'100%'} >
                      
                      <label> {t(`authtype.inputLabel.${loginMethod}`)} </label>                      
                      <ReactCodeInput  inputStyle={{fontSize:20}}  key={loginMethod}   onChange={(v)=>loginForm.setValue('initValue',v)}
                            type='number' fields={AuthMethods[loginMethod].length||10}                             
                           inputMode={'numeric'} name={loginMethod} />                          
                      <Stack  direction={'row'} justifyContent={'space-between'}>
                          <Container>
                            Not Registered ? 
                            <Button  onClick={()=>navigate('/register')} >Create ABHA ID</Button>
                          </Container>                          
                          {/* Action Button */}                          
                          <Button variant='contained' disabled={auth.captcha==null || !loginForm.getValues().initValue} >NEXT</Button>
                      </Stack>
                      </Stack>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
          
      </div>
    </Container>
  );
}

export default Login;
