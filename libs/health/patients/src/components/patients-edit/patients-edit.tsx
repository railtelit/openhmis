import { useFhirConverter, useFhirCreate } from '@ha/appfhir';
import { Box, Button, ButtonGroup, Grid, MenuItem, TextField } from '@mui/material';
import styles from './patients-edit.module.scss';
import { useFieldArray, useForm } from 'react-hook-form'
import { AddressForm } from './address';
import { useEffect } from 'react';
/* eslint-disable-next-line */
export interface PatientsEditProps {
    onClose?:()=>void,
    onCreate?:(newResource:any)=>void
}

export function PatientsEdit(props: PatientsEditProps) {
  const [newPatient,makeRequest,  ]=useFhirCreate('Patient');
  const {convertToResource,result} = useFhirConverter('Patient')
  const {register,handleSubmit, control, formState:{errors}}=useForm({    }); 
  const { fields,append,prepend,move,insert, }=useFieldArray({control,name:'address'}); 
  
  function onSave(formValue:any){
              const f= convertToResource(formValue)
               console.log(f)
  }
  useEffect(()=>{
     //
     append({line1:'',line2:'',city:null,state:null,pincode:'' })
  },[])
  return (
         <form onSubmit={handleSubmit(onSave)}>          
    <div className={styles['container']}>

      <Grid container spacing={4} >
           <Grid item md={6}>
                <TextField  required error={ errors['name']!==undefined } 
                    label='Name' {...register('name',{required:true,})}   fullWidth />
           </Grid>
           
           <Grid item md={3}>
                <TextField label='Mobile Number' error={errors['mobileno']!==undefined} 
                         helperText={ errors['mobileno']? 'Must be 10 digits':null}
                    {...register('mobileno',{minLength:10})}   fullWidth />
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
                 
               {
                    fields.map( (item,index)=> <AddressForm  errors={errors} key={item.id} register={register} id={item.id} index={index}  /> )
               }
                
                    </Grid>
      </Grid>
          
      
      <Grid container spacing={2} sx={{padding:4}}  justifyContent={'end'}>
           
               <Button  type='submit' variant='contained'  >SAVE</Button>          

               <Button  variant='contained' color='error' onClick={props?.onClose ? props.onClose: ()=>{
                  //
                } } >CANCEL</Button>                     
      </Grid>
    </div>
      </form>
  );
}

export default PatientsEdit;
