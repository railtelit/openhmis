import { Title } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import React, { Suspense, useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useTranslation } from 'react-i18next';
import { OTPView } from '../../login/otp-view';
import styles from './aadhaar-registration.module.scss';

/* eslint-disable-next-line */
export interface AadhaarRegistrationProps {}
interface RegistrationState{
    aadhaarno:string|null,
    startAction:any,otp?:string,
}
export function AadhaarRegistration(props: AadhaarRegistrationProps) {

  const [step,setStep]=useState<number>(0);
  const [registrationState,setRegistrationState]=useState<RegistrationState>({aadhaarno:null,
      startAction:{disabled:true} })
  const {t}=useTranslation()
  const AadharForm=React.lazy(()=>import('../aadhaar-form/aadhaar-form'))
  const stepViews=[     
        <Stack justifyContent={'center'} >
            <label>{t('registration.method.aadhaar.title')}</label>
           <ReactCodeInput 
                onChange={(val)=>setRegistrationState((state)=>({...state,aadhaarno:val,startAction:{disabled:val.length===12?false:true} }))} 
                name={'aadhaar'} type={'number'}  fields={12}  inputMode='numeric'  />  
        </Stack>,
        <Stack justifyContent={'center'}>
        
            <OTPView onChange={(val)=>{
                setRegistrationState((state)=>({...state,otp:val}))
            }} />
        </Stack>,
        
              <Suspense fallback={'Loading...'}>    
                    <AadharForm />
              </Suspense>
        
  ]

  const actionViews=[
       <Button onClick={()=>setStep(1)} {...registrationState.startAction} variant='contained' > BEGIN </Button>,
       <Button onClick={()=>setStep(2)} >{t('authtype.actionLabel.verifyOtp')}</Button>
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
