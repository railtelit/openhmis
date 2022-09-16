import { Title } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import React, { Suspense, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useTranslation } from 'react-i18next';
import { OTPView } from '../../login/otp-view';
import { useRegisterService } from '../useRegisterService';
import styles from './aadhaar-registration.module.scss';

/* eslint-disable-next-line */
export interface AadhaarRegistrationProps {}
interface RegistrationState{
    aadhaarno:string|null,aadhaarMobileno?:string,
    startAction:any,otp?:string,
    mobile:string,txnId:string
}
export function AadhaarRegistration(props: AadhaarRegistrationProps) {

  const [step,setStep]=useState<number>(0);
  const [registrationState,setRegistrationState]=useState<RegistrationState>({aadhaarno:null,
      startAction:{disabled:true},mobile:'',txnId:'' })
  const {t}=useTranslation()
  const AadharForm=React.lazy(()=>import('../aadhaar-form/aadhaar-form')); 
  const registerService=useRegisterService();
  const stepViews=[     
        <Stack justifyContent={'center'} >
            <label>{t('registration.method.aadhaar.title')}</label>
           <ReactCodeInput 
                onChange={(val)=>setRegistrationState((state)=>({...state,aadhaarno:val,startAction:{disabled:val.length===12?false:true} }))} 
                name={'aadhaar'} type={'number'}  fields={12}  inputMode='numeric'  />  
        </Stack>,
        <Stack justifyContent={'center'}>        
            <Typography> OTP SENT : {registrationState?.aadhaarMobileno} </Typography>
            <OTPView onChange={(val)=>{
                setRegistrationState((state)=>({...state,otp:val}))
            }} />
        </Stack>,
        <Stack justifyContent={'center'} spacing={2}> 
                <Typography>SPECIFY MOBILE NUMBER TO LINK WITH ABHA NUMBER</Typography>
                <ReactCodeInput name={'mobile'} fields={10} inputMode={'numeric'}
                    onChange={(val)=>{ 
                        setRegistrationState((state)=>({...state,mobile:val}))
                    }}  />
        </Stack>,
        <Stack justifyContent={'center'} spacing={2} >
                  <Typography>Mobile : {registrationState.mobile} </Typography>
                  <OTPView onChange={(val)=>{
                          setRegistrationState((state)=>({...state,otp:val}))
                    }} />
        </Stack>,
              <Suspense fallback={'Loading...'}>    
                    <AadharForm  mobile={registrationState.mobile} txnId={registrationState.txnId} />
              </Suspense>

  ]

  const actionViews=[
       <Button onClick={async ()=> { 
           const {aadhaarno}=registrationState
           if(aadhaarno){
             const response= await registerService.aadhaar.generateAdhaarMobileOtp({aadhaar:aadhaarno});
             console.log(response.data)
            if(response.data.txnId){
              setRegistrationState((state)=>({...state,txnId:response.data.txnId,aadhaarMobileno:response.data?.mobileNumber  }))
              setStep(1) 
            }
           }
        } } 
       {...registrationState.startAction} variant='contained' > BEGIN </Button>,

       <Button onClick={ async ()=>{
              const {txnId,otp}=registrationState
              if(otp && txnId ){
                const response =await registerService.aadhaar.verifyAadhaarMobileOtp({txnId,otp}); 
                if(response.data.txnId){
                  setStep(2)
                }
              }
        }      
        } >{t('authtype.actionLabel.verifyOtp')}</Button>,
       <Button onClick={async ()=>{
        const {txnId,mobile}=registrationState

        if(mobile && txnId ){
          const response =await registerService.aadhaar.generateMobileOTP({txnId,mobile})
              if(response.data.txnId)
                setStep(3)
        }
        } } >VERIFY MOBILE</Button>,
        // Verify Mobile OTP 
       <Button onClick={async ()=>{ 
              const {txnId,otp}=registrationState
              if( txnId && otp){
                const response =await registerService.aadhaar.verifyMobileOTP({txnId,otp})
                setStep(4) 
             }
          } 
      } >{t('authtype.actionLabel.verifyOtp')}</Button>
  ]

  return (
    <div className={styles['container']}>
      {/*  */}
      <Card>
        <Typography variant='h3'> {t('registration.method.aadhaar.title')} </Typography>
        <CardContent>          
          <Grid container alignContent={'center'} justifyContent={'center'} p={2}>
                  
                  {stepViews[step]}
                 <Grid container justifyContent={'center'}>
                    {actionViews[step]}
                 </Grid>
          
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default AadhaarRegistration;
