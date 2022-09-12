import { TabPanel } from '@mui/lab';
import { Button, ButtonProps, Card, CardContent, Container, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeInput from '../../../components/code-input/code-input';
import { AuthContext, AuthMethodConfig, AuthMethods, AuthType, } from '../../AuthProvider';
import { useApiService } from '../../hooks/useApiService';
import { AppState, nextStep } from '../../store/app.store';
import styles from './login.module.scss';
import { useLoginService } from './useLoginService';

/* eslint-disable-next-line */
export interface LoginProps {}
interface LoginState{
    authNumber:string,otp?:string,txnId?:string
}
export function Login(props: LoginProps) {
  const [txnId,setTxnid]=useState(null);
  const auth=useContext(AuthContext); 
  const [loginMethod,setLoginMethod]=useState<AuthType>("mobile"); 
  const [currauthconfig,setCurrentauthconfig]=useState<AuthMethodConfig>(AuthMethods.mobile)
  const loginForm=useForm({defaultValues:{authNumber:'',otp:null,txnId:null}})
  const [loginState,setLoginState]=useState<LoginState>({authNumber:''})
  const apiservice=useApiService();  
  const navigate=useNavigate();
  const {t,i18n} = useTranslation(); 
  const loginService=useLoginService();
  const [nextState,setNextState]=useState<ButtonProps>({disabled:true, })
  
 
  
  useEffect(()=>{
      if(auth?.captcha?.length  && ( loginState.authNumber||'').length===AuthMethods[loginMethod].length){
           setNextState((s)=>({...s,disabled:false}))
      }else 
          setNextState((s)=>({...s,disabled:true})); 
  },[  loginState,   auth,loginMethod]); 
  
  //console.log('ref')
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
                    <ToggleButtonGroup exclusive value={loginMethod}  onChange={(e,value)=>{  
                        setLoginMethod(value)
                        setCurrentauthconfig(AuthMethods[value as AuthType]); 
                        setLoginState((s)=>({...s,authNumber:''}))
                    }
                        }>
                        {Object.keys(AuthMethods).map( (k)=>
                             <ToggleButton key={k} value={k}  >{t(`authtype.inputLabel.${k}`)} </ToggleButton>
                           )}
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={12} justifyContent={'center'} >                     
                      <Stack width={'100%'} >                      
                      {/* <CodeInput  label={t(`authtype.inputLabel.${loginMethod}`)} 
                         type='number' fields={AuthMethods[loginMethod].length||10}    name={loginMethod} inputMode={'numeric'} /> */}
                      <label> {t(`authtype.inputLabel.${loginMethod}`)} </label>                      
                      <ReactCodeInput  inputStyle={{fontSize:20}} key={loginMethod}  onChange={(v)=>{
                                setLoginState((s)=>({...s,authNumber:v}))
                      }}
                        type='number' fields={currauthconfig.length||10}                             
                                  inputMode={'numeric'} name={loginMethod} 
                          />
                          
                      <Stack  direction={'row'} justifyContent={'space-between'}>
                          <Container>
                              Not Registered ? 
                            <Button  onClick={()=>navigate('/register')} >Create ABHA ID</Button>
                          </Container>                          
                          {/* Action Button */}                          
                          <Button variant='contained' {...nextState} onClick={()=>{
                              console.log('sending to ',loginState.authNumber); 
                              loginService.mobilegenerateOtp({mobile:loginState.authNumber});
                          }} >NEXT</Button>                          
                           
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
