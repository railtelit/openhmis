import { useFhirConverter, useFhirCreate, useFhirUpdate } from '@ha/appfhir';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Dialog,DialogTitle,DialogContent,
     DialogActions, Radio, TextField,Button, Autocomplete, Divider, Typography, Paper, Stack, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './edit-organization.module.scss';
const Empty=()=>{
    //
}
/* eslint-disable-next-line */
export interface EditOrganizationProps {
    start?:boolean,
    onClose?:()=>void,
    onCreate?:(org:any)=>void,
    onUpdate?:(org:any)=>void,
     mode?:string,
     record?:any
}

export function EditOrganization({start=false,onClose=Empty,onCreate=Empty,mode='create',record=null,onUpdate=Empty  }: EditOrganizationProps) {
  const [startcreate,setStartcreate]=useState<boolean>(start); 
  const [editmode,setEditMode]=useState(mode)
  const [neworg,errors,createOrg]=useFhirCreate('Organization');
  const [editrecord,setEditrecord]=useState(record)
  const [updatedorg,updateerrors,updateOrg]=useFhirUpdate('Organization',editrecord);
  const {setValue,setFocus,register,control,formState,getValues,handleSubmit,}=useForm({ })
  const {convertToForm,convertToResource}=useFhirConverter('Organization')
  useEffect(()=>{
       setStartcreate(start);
  },[start]); 
  useEffect(()=>{
      setFocus('name');  
   //   setValue('status','active'); 
      
  },[])
  useEffect(()=>{
      setEditrecord(record); 
      if(record){
      const value = convertToForm(record); 
      Object.keys(value).forEach(k=>{
        setValue(k,value[k]);
      })
      console.log(`Converted OnRecord`,getValues()); 
     }
  },[record])
  useEffect(()=>{
      setEditMode(mode); 
      if(mode==='create'){
        setValue('active',true);
      }
  },[mode])
  function doSave(org:any){
         
         const res=convertToResource(org); 
         if(mode==='create'){
         createOrg(convertToResource(org)).then(o=>{          
            onCreate(o); 
            toast.success('Organization Created..!')
         })
        }else if(mode==='edit'){
       
            updateOrg(res).then(r=>{
                 toast.success('Record Updated');
                 onUpdate(r)
            })
        }
  }
  
  return (
    <div className={styles['container']}>
           
            <form onSubmit={handleSubmit(doSave)}>
              <Grid container   justifyContent={'space-between'}>
                  <Typography> <Icon>{mode==='create'?'add':'edit'}</Icon> {mode.toLocaleUpperCase()} HEALTH INSTITUTION  </Typography>
                  <Stack direction={'row'}  spacing={1}>
                    <Button type='submit' variant='contained'>{mode==='create'?'SAVE':'UPDATE'}</Button>
                    <Button variant='outlined' onClick={()=>onClose()} color={'error'} >CANCEL</Button>
                  </Stack>
              </Grid>
               
                 <Grid container  spacing={2} >
                    <Grid item xs md={12}>
                      <FormControl  >
                            <FormLabel>Active</FormLabel>
                             <Controller control={control} name='active' 
                              render={ ({field:{value,onChange} })=><RadioGroup   value={value||'false'} onChange={onChange} row >
                                  
                                   <FormControlLabel value={true} label='Yes'  control={<Radio/>}></FormControlLabel>
                                   <FormControlLabel value={'false'} label='No'  control={<Radio/>}></FormControlLabel>
                              </RadioGroup> }
                             />

                             
                      </FormControl>
                    </Grid>
                    <Grid item xs md={12} >
                      <TextField label="Name" {...register('name')}  fullWidth required />                                  
                    </Grid> 
                    <Grid item xs md={12} >
                      <Autocomplete  options={[]}  freeSolo onChange={(e,values)=>setValue('alias',values )} 
                            multiple={true} renderInput={(params)=><TextField label='Other Names'   {...params} />}  />                  
                    </Grid>
                    <Grid item md={12} justifyContent={'center'} >
                          <Divider  />
                    </Grid>
                    <Grid item container xs md={12} spacing={2}>  
                              <Typography width={100} textAlign={'center'} variant='body1'>Address</Typography>
                              <Grid item md={12}>                                    
                                  <TextField  fullWidth label='Line 1'/>                                       
                              </Grid>
                              <Grid item   md={12}>                                    
                                  <TextField  fullWidth label='Line 2'/>                                       
                              </Grid>
                              <Grid item   md={3}>                                    
                                  <TextField  fullWidth {...register('pincode')} label='PinCode'/>                                       
                              </Grid>
                              <Grid item   md={5}>                                    
                                  <TextField  fullWidth {...register('state')} label='State'/>                                       
                              </Grid>
                              <Grid item   md={4}>                                    
                                  <TextField autoComplete='off' fullWidth {...register('mobileno', )} 
                                    label='Mobile'/>                                       
                              </Grid>
                    </Grid> 
                 </Grid>
                </form>    
      
    
    </div>
  );
}

export default EditOrganization;
