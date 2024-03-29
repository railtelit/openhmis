import { useFhirConverter, useFhirCreate, useFhirUpdate } from '@ha/appfhir';
import { RichObjectTree } from '@ha/shared-ui';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Dialog,DialogTitle,DialogContent,
     DialogActions, Radio, TextField,Button, Autocomplete, Divider, Typography, Paper, Stack, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
     record?:any,
     orgtype?:string,
     partOf?:any
}

export function EditOrganization({start=false,onClose=Empty,onCreate=Empty,mode='create',record=null,onUpdate=Empty ,orgtype='prov',partOf }: EditOrganizationProps) {
  const [startcreate,setStartcreate]=useState<boolean>(start); 
  const [editmode,setEditMode]=useState(mode)
  const [neworg,errors,createOrg]=useFhirCreate('Organization');
  const [editrecord,setEditrecord]=useState(record)
  const [updatedorg,updateerrors,updateOrg]=useFhirUpdate('Organization',editrecord);
  const {setValue,setFocus,register,control,formState,getValues,handleSubmit,trigger}=useForm({ defaultValues:{active:true,name:''} as any })
  const  r = useFieldArray({control,name:'address'})
  const {convertToForm,convertToResource}=useFhirConverter('Organization')
  const orgForm  = {setValue,setFocus,control,formState}; 
  useEffect(()=>{
       setStartcreate(start);
  },[start]); 
  useEffect(()=>{
      setFocus('name');  
   //   setValue('status','active');     
      
  },[]); 

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
        console.log(orgtype,partOf);
        const res=convertToResource({...org,type:orgtype}); 
        console.log(res); 
        
         if(mode==='create'){
         createOrg( {...res,partOf}).then(o=>{          
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
              <Grid container alignItems={'center'} alignContent={'center'}  justifyContent={'space-between'}>
                  <Typography> <Icon>{mode==='create'?'add':'edit'}</Icon> {mode.toLocaleUpperCase()} HEALTH { orgtype==='dept'?'DEPARTMENT':'INSTITUTION'}  </Typography>
                  <Stack direction={'row'} alignContent={'center'}  spacing={1}>
                    <Button type='submit' variant='contained'>{mode==='create'?'SAVE':'UPDATE'}</Button>
                    <Button variant='outlined' onClick={()=>onClose()} color={'error'} >CANCEL</Button>
                  </Stack>
              </Grid>
               
                 <Grid container  spacing={2} >
                    <Grid item xs md={12}>
                      <FormControl  >
                            {/* <FormLabel>Active</FormLabel> */}
                             <Controller control={control} name='active' 
                              render={ ({field:{value,onChange} })=><RadioGroup   value={value||'false'} onChange={onChange} row >                                  
                                   <FormControlLabel value={true} label='Active'  control={<Radio/>}></FormControlLabel>
                                   <FormControlLabel value={'false'} label='In-Active'  control={<Radio/>}></FormControlLabel>
                              </RadioGroup> }
                             />

                             
                      </FormControl>
                    </Grid>
                    <Grid item xs md={12} >
                      <TextField label="Name" {...register('name')}  fullWidth required />                                  
                    </Grid> 
                    <Grid item xs md={12} >
                      <Autocomplete  options={[]}  freeSolo onChange={(e,values)=>setValue('alias',values )} 
                            multiple={true} renderInput={(params)=><TextField label='Alternate Names'   {...params} />}  />                  
                    </Grid>
                    <Grid item md={12} justifyContent={'center'} >
                          <Divider  />
                    </Grid>
                       <Grid item   md={4}>                                    
                            <TextField autoComplete='off' fullWidth {...register('mobileno', )}  
                                    InputProps={{ endAdornment: <Icon>phone_android</Icon> }}
                                    label='Contact'/>   
                  {/* <ContactPoint   />
                      <ArrayField name="telecom" 
                           defaultElements={[ <ContactPointField  use='mobile'/> ]} >                              
                      </ArrayField>
                      <TelecomField name='telecom' useContext={false} control={control} defaultValue=[{use:'mobile'}]>
                      </TelecomField>
                  */}
                                                               
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
                                  <TextField  fullWidth {...register('city')} label='City'/>                                       
                              </Grid>
                              <Grid item   md={3}>                                    
                                  <TextField  fullWidth {...register('pincode')} label='PinCode'/>                                       
                              </Grid>
                              <Grid item   md={6}>                                    
                                  <TextField  fullWidth {...register('state')} label='State'/>                                       
                              </Grid>
                          
                    </Grid> 
                 </Grid>
                </form>    
      
    
    </div>
  );
}

export default EditOrganization;
