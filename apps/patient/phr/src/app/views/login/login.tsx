import { OtpTimeout } from '@ha/shared-ui';
import { TabPanel } from '@mui/lab';
import { Button, ButtonProps, Card, CardContent, Container, Grid, List, ListItem, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeInput from '../../../components/code-input/code-input';
import { AuthContext, AuthMethodConfig, AuthMethods, AuthType, } from '../../AuthProvider';
import { useApiService } from '../../hooks/useApiService';
import { AppState, AuthState, nextStep } from '../../store/app.store';
import styles from './login.module.scss';
import { OTPView } from './otp-view';
import { useLoginService } from './useLoginService';

/* eslint-disable-next-line */
export interface LoginProps {}
interface LoginState{
    authNumber:string,otp:string,txnId?:string|null,step:number,
    verifyMobileResponse?:any
}
export function Login(props: LoginProps) {
  const [otp,setOtp]=useState('');
  const auth=useContext(AuthContext); 
  const [loginMethod,setLoginMethod]=useState<AuthType>("mobile"); 
  const [currauthconfig,setCurrentauthconfig]=useState<AuthMethodConfig>(AuthMethods.mobile)
  const loginForm=useForm({defaultValues:{authNumber:'',otp:null,txnId:null}})
  const [loginState,setLoginState]=useState<LoginState>({authNumber:'',txnId:null,step:0,otp:''})
  const apiservice=useApiService();  
  const navigate=useNavigate();
  const {t,i18n} = useTranslation(); 
  const loginService=useLoginService();
  const [nextState,setNextState]=useState<ButtonProps>({disabled:true, })
  const authState = useSelector((state:AppState)=>state.auth) 
  
 // console.log('ref')
  useEffect(()=>{
      if(auth?.captcha?.length  && ( loginState.authNumber||'').length===AuthMethods[loginMethod].length){
           setNextState((s)=>({...s,disabled:false}))
      }else{
        if(!nextState.disabled)
            setNextState((s)=>({...s,disabled:true}));
      }
  },[  loginState,   auth,loginMethod]); 

  useEffect(()=>{
      if(authState.userToken){
            navigate('/account');
      }
  },[]);
  
  const StepsView=[
      <>
              <label> {t(`authtype.inputLabel.${loginMethod}`)} </label>                      
                      <ReactCodeInput  inputStyle={{fontSize:20}} key={loginMethod}  onChange={(v)=>{                                
                                setLoginState((s)=>({...s,authNumber:v}))
                      }}
                        type='number' fields={currauthconfig.length||10}                             
                                  inputMode={'numeric'} name={loginMethod} 
                          />
      </>,
       <OTPView onChange={(value)=>{
              setLoginState((s)=>({...s,otp:value}))
       }} />,
       <>
         SELECT ACCOUNT
         {/* {JSON.stringify(loginState.verifyMobileResponse)} */}
         <List>
               {( (loginState.verifyMobileResponse?.mobileLinkedHid||[]) as any[]).map(
                  account => <ListItem key={account.healthId}>
                       <Button onClick={()=>{
                          loginService.userAuthorizedToken({healthId: account.healthIdNumber,
                                Ttoken:loginState.verifyMobileResponse.token,
                                txnId: loginState.verifyMobileResponse.txnId }).then( response=>{
                                    if(response.token){
                                         console.log('Hurray Here '); 
                                         navigate('/account')
                                    }
                                } )
                       }} > {account.healthId} : {account.name} </Button>
                  </ListItem>
               )}
           </List>
       </>
  ]
  const StepActions=[
        // Send Auth Number
        <Button variant='contained' {...nextState}   onClick={()=>{
                              console.log('sending to ',loginState.authNumber); 
                              loginService.mobilegenerateOtp({mobile:loginState.authNumber}).then(r=>{
                                  setLoginState( (s)=>({...s,txnId:r.txnId,step:1}))
                              });
                          }} > SUBMIT </Button>
        ,
        // Send OTP
        <Grid container justifyContent={'end'} gap={2}>
           {/* Cancel Action */}
           <Button color='error' onClick={()=>{ setLoginState((s)=>({...s,step:0})) } } >CANCEL</Button>
                          {/* Verify OTP Action */}
           <Button variant='contained'  {...nextState} onClick={()=>{
          console.log('sending to ',loginState.authNumber); 
          loginService.verifyOtp({ otp: loginState.otp,txnId:loginState.txnId||'0'}).then(r=>{
                  if(r.txnId)
                    setLoginState( (s)=>({...s, verifyMobileResponse:r,txnId:r.txnId ,step:2}))
          });
      }} > SUBMIT OTP </Button>   
        </Grid>,
      // Select Account 
      <Grid container>
{/*           
           <Button onClick={()=>{
               // loginService.userAuthorizedToken({})
           }} >SELECT ACCOUNT</Button> */}
      </Grid>
          
  ]
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
                        setLoginState((s)=>({...s,authNumber:'',step:0}))
                    }
                        }>
                        {Object.keys(AuthMethods).map( (k)=>
                             <ToggleButton key={k} value={k}  >{t(`authtype.inputLabel.${k}`)} </ToggleButton>
                           )}
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={12} justifyContent={'center'} >                     
                      <Stack width={'100%'} >                      
                        
                      {StepsView[loginState.step]}    
                          
                      <Stack  direction={'row'} justifyContent={'space-between'}>
                          {
                             loginState.step===0?<Container  >
                              Not Registered ? 
                            <Button  onClick={()=>navigate('/register')} >Create ABHA ID</Button>
                          </Container>
                          : null
                          }

                          {/* Action Button */}       

                          {StepActions[loginState.step]}                    
                           
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
