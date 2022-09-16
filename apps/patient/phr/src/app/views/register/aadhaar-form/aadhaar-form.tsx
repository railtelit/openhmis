import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Modal, Select, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { SetPasswordForm } from '../password-form';
import { useRegisterService } from '../useRegisterService';
import styles from './aadhaar-form.module.scss';

/* eslint-disable-next-line */
export interface AadhaarFormProps {
         txnId:string,mobile:string
}

const TF=(props:{ label:string, textprops?:TextFieldProps,type?:string} )=><TextField 
    variant={'standard'} {...props.textprops} label={props.label}
    fullWidth  InputLabelProps={{shrink:true,"aria-expanded":true} }   />
const OF=(props:{label:string,options:any[],selectprops:any})=><FormControl fullWidth variant='standard'>
      <InputLabel shrink> {props.label}</InputLabel>
      <Select fullWidth  {...props.selectprops} >
              {props.options?.map(o=><MenuItem value={o.value} key={o.value} > {o.label} </MenuItem>)}
      </Select>
</FormControl>

const ConfirmText=(props:{label:string,value:string})=><Stack my={1}>
        <Typography variant='caption' >{props.label}</Typography>
        <Typography variant='body1' >{props.value}</Typography>
</Stack>

export function AadhaarForm(props: AadhaarFormProps) {
  const aform=useForm<any>({defaultValues:{ address:'',healthId:'',password:'',
                                dayOfBirth:''
                ,monthOfBirth:'',gender:'',firstName:'',middleName:'',lastName:'',email:'',stateCode:'',districtCode:'' }})
  const genderOptions=[{value:'M',label:'Male'},{value:'F',label:'Female'}]
  const [formValue,setFormValue]=useState<any>({});
  const [formState,setFormState]=useState<{isValid:boolean}>({isValid:false});

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirm,setShowConfirm]=useState(false); 
  const getBirthdate= useMemo( ()=>[aform.getValues('dayOfBirth'),aform.getValues('monthOfBirth')].join('/')
        ,[aform])
    const registerService=useRegisterService();
  const [states,setStates]=useState<any[]>([])
  const [districts,setdistricts]=useState<any[]>([])
  useEffect(()=>{
         registerService.options.getStates().then(options=>{
                setStates(options.map(v=> ({value:v.code,label:v.name}) ))
         });
  },[]); 
  const loadDistricts=(()=>{ 
        registerService.options.getDistricts({stateCode:aform.getValues().stateCode}).then(results=>{
             setdistricts( results.map( v=>({value:v.code,label:v.name}) ) )
        })
  })
  
  return (    
      <Box>
          <Grid container gap={4} alignItems={'center'} spacing={1}>
              <Grid item md={12}>
                    <TF    textprops={{...aform.register('address')}} label={'Address'} />
              </Grid>
              <Grid item md={4}>
                    <TF   textprops={{...aform.register('firstName')}}    label={'First Name'} />
              </Grid>
              <Grid item md={3}>
                    <TF   textprops={{...aform.register('middleName')}}   label={'Middle Name'} />
              </Grid>
              <Grid item md={3}>
                    <TF  textprops={{...aform.register('lastName')}}    label={'Last Name'} />
              </Grid>
              <Divider/>
              <Grid item md={12}>
                    <TF textprops={{...aform.register('email')}}  label={'Email'} />
              </Grid>
              {/* <Grid item md={4}  >
                 <Typography variant='body2' >Date of Birth</Typography>
                 <Stack direction={'row'} justifyContent={'space-around'} display={'flex'} >
                    <TF textprops={{...aform.register('dayOfBirth')}} type={'number'} label={'Day '} />
                    <TF  textprops={{...aform.register('monthOfBirth')}} type={'number'}  label={'Month '} />
                    <TF type={'number'}  label={'Year '} />
                 </Stack>
              </Grid> */}
              {/* <Grid item  md={2}  alignSelf={'end'} >
                   <FormControl fullWidth variant='standard'>
                      <InputLabel shrink  >Gender</InputLabel>
                      <Select fullWidth label={'Gender'} variant='standard' {...aform.register('gender')} >
                          {genderOptions.map((g)=><MenuItem value={g.value} key={g.value} >{g.label}</MenuItem>)}
                      </Select>
                   </FormControl>
              </Grid> */}
               <Grid p={0} m={0} container item md={12} gap={2} spacing={1} >
                  <Grid item md={3}>
                      <OF label='State' options={states}
                        selectprops={{...aform.register('stateCode'),onChange:(event:any)=>{
                                //console.log(v)
                                aform.setValue('stateCode',event.target?.value)
                                loadDistricts(); 
                        }}} />
                  </Grid>
                  <Grid item md={3}>
                      <OF label='District' options={districts}
                        selectprops={{...aform.register('districtCode')}} />
                  </Grid>
                  <Grid item md={2}>
                      <TF    label={'Pin Code'} />
                  </Grid>
               </Grid>
               <Grid  item container mx={0} justifyContent={'space-between'}>
                     {aform.getValues('healthId')?
                            <Stack direction={'row'} alignContent={'center'} alignItems={'center'}>
                                <Icon color={formState.isValid?'success':'error'}>{formState.isValid?'check':'cancel'}</Icon>
                                <Typography variant='caption'>Health Id : {aform.getValues('healthId')}</Typography>
                                <IconButton onClick={()=>setShowPassword(true)}><Icon>edit</Icon></IconButton>                                
                            </Stack>
                            : 
                            <Button  variant='contained' onClick={()=>setShowPassword(true)} >SETUP HEALTHID</Button>
                      }
                     
                    <Button disabled={!formState.isValid}  sx={{visibility:aform.getValues('healthId')?'visible':'hidden'}} 
                            variant='contained' color='error'
                     onClick={()=>{
                            setFormValue(aform.getValues());setShowConfirm(true)
                     }} >CONFIRM</Button>
               </Grid>
          </Grid>
                 <Dialog open={showPassword} maxWidth={'md'} fullWidth onClose={()=>setShowPassword(false)}>
                    <DialogTitle justifyContent={'space-between'} display={'flex'}>

                        <Typography variant='h3' >Setup Credentials</Typography>
                        <IconButton onClick={()=>setShowPassword(false)} ><Icon>close</Icon> </IconButton>
                    </DialogTitle>
                    <DialogContent>              
                                                <SetPasswordForm  control={aform.control} visible={showPassword} onSetCredentials={async (val)=>{
                                                    registerService.aadhaar.checkHealthIdExists({healthId:aform.getValues('healthId')}).then(result=>{
                                                        console.log('setting',!result.data.status,result.data)
                                                         setFormState((state)=>({isValid: !result?.data?.status }))
                                                    })
                                                        setShowPassword(false); 
                                                    }}  />
                                        
                    </DialogContent>
                 </Dialog>
                <Dialog maxWidth={'md'} fullWidth onClose={()=>setShowConfirm(false)} open={showConfirm}>
                            <DialogTitle display={'flex'} justifyContent={'space-between'}> 
                                    <Typography variant='h3'>Confirmation</Typography>
                                    <IconButton onClick={()=>setShowConfirm(false)} ><Icon>close</Icon></IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <Stack>
                                    <ConfirmText label='healthId' value={aform.getValues('healthId')} />
                                    <ConfirmText label='email' value={aform.getValues('email')} />
                                    <ConfirmText label='mobile' value={props.mobile} />
                                    {/* <ConfirmText label='name' value={aform.getValues('firstName')} />
                                    <ConfirmText label='gender' value={aform.getValues('gender')} />                                     */}
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{p:3}} >
                                <Button variant='contained' onClick={()=>{
                                    const {healthId,password,address,email,firstName,middleName,lastName,
                                        pinCode}=aform.getValues()
                                    registerService.aadhaar.createHealthIdwithAadhar({txnId:props.txnId,
                                            healthId,password,address,email,
                                            firstName,middleName,lastName,pinCode
                                    })
                                }} >CREATE ABHA ID</Button>
                            </DialogActions>
                </Dialog>
      </Box>
  );
}

export default AadhaarForm;
