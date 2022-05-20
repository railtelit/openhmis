import { useFhirConverter, useFhirCreate, useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, TextField } from '@mui/material';
import styles from './patients-edit.module.scss';
import { useFieldArray, useForm } from 'react-hook-form'
import { AddressForm } from './address';
import { useEffect, useRef } from 'react';
/* eslint-disable-next-line */
export interface PatientsEditProps {
    onClose?:()=>void,
    onCreate?:(newResource:any)=>void,
    record?:any
    mode:string
}

export function PatientsEdit({onClose=()=>{const i = true },mode,onCreate,record}: PatientsEditProps) {
     const nameRef=useRef<HTMLInputElement|null>(); 
     
  const [newPatient, error, createPatient,  ]=useFhirCreate('Patient');
  const [results,queryerror,query,deletePatient,]=useFhirQuery('Patient')
  const {convertToResource, convertToForm, result} = useFhirConverter('Patient')
  const {register,handleSubmit, control, formState:{errors,}, setValue,  setFocus }=useForm({    }); 
  const { fields,append,prepend,move,insert,remove, }=useFieldArray({control,name:'address' }); 
  const defaultAddress ={line1:'',line2:'',city:null,state:null,pincode:'' } ;
  async function onSave(formValue:any){
              const newRecord= convertToResource(formValue)
              // makeRequest(newRecord)
              await createPatient(newRecord)
  }
  useEffect(()=>{
          console.log(`Pat Created : `); 
          console.log(newPatient);
          newPatient && newPatient.id && onClose()
  },[newPatient])
  useEffect(()=>{
     //
     if(mode==='edit' && record){
          const formValue = convertToForm(record);
          console.log(`Converted`); 
          console.log(formValue);
          Object.keys(formValue).forEach(field=>{
               setValue(field,formValue[field])
          })
          
     }
     append(defaultAddress);
     setFocus('name'); 
     
  },[])
  return (
         <form onSubmit={handleSubmit(onSave)}>          
    <div className={styles['container']}>

      <Grid container spacing={4} >
           <Grid item md={6}>
                <TextField InputLabelProps={{shrink:true}} required error={ errors['name']!==undefined } 
                    label='Name' {...register('name',{required:true,})}   fullWidth />
           </Grid>
           
           <Grid item md={3}>
                <TextField label='Mobile Number' InputLabelProps={{shrink:true}} error={errors['mobileno']!==undefined}  
                         helperText={ errors['mobileno']? 'Must be 10 digits':null}
                    {...register('mobileno',{minLength:10,} )}    fullWidth />
           </Grid>
           <Grid item md={3}>
                <TextField label='PUID'  {...register('uid')} fullWidth placeholder='Unique Identifier Number' />
           </Grid>
           <Grid item md={3}>
                <TextField type={'date'} {...register('birthDate')}  InputLabelProps={{shrink:true}} label='Date Of Birth'   fullWidth   />
           </Grid>
           <Grid item md={3}>
                <TextField label='Gender' {...register('gender',)} defaultValue={''} select   fullWidth placeholder='Gender' >
                     <MenuItem value='male'>Male</MenuItem>
                     <MenuItem value='female'>Female</MenuItem>
                </TextField>
           </Grid>
                    <Grid item md={12} >
                     <Box justifyContent={'end'}  > <IconButton onClick={()=>append(defaultAddress)}> <Icon>add</Icon> </IconButton> </Box>
               {
                    fields.map( (item,index)=> <AddressForm onRemove={(index)=>remove(index)} errors={errors} key={item.id} register={register} id={item.id} index={index}  /> )
               }
                
                    </Grid>
      </Grid>
          
      
      <Grid container spacing={2} sx={{padding:4}}  justifyContent={'end'}>
           
               <Button  type='submit' variant='contained'  >SAVE</Button>          

               <Button  variant='contained' color='error' onClick={ onClose!==undefined ? onClose: ()=>{
                  //
                } } >CANCEL</Button>                     
      </Grid>
    </div>
      </form>
  );
}

export default PatientsEdit;
