import { useFhirConverter, useFhirCreate, useFhirQuery, useFhirResolver, useFhirUpdate } from '@ha/appfhir';
import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import styles from './patients-edit.module.scss';
import { useFieldArray, useForm } from 'react-hook-form'
import { AddressForm } from './address';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
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
  const [update,updateError,updatePatient]=useFhirUpdate('Patient',record);

  const defaultAddress ={line1:'',line2:'',city:null,state:null,pincode:'' } ;
  async function onSave(formValue:any){
              const newRecord= convertToResource(formValue)

              // makeRequest(newRecord)
              if(mode==='edit')
                     updatePatient(newRecord).then(_=>{
                              toast.success(`Record Updated SuccessFully `)
                    });
               else
                    await createPatient(newRecord).then(res=>{
                              onCreate && onCreate(res);
                    });


  }
  useEffect(()=>{
          console.log(`Pat Created : `);
          console.log(newPatient);
          newPatient && newPatient.id && onCreate && toast.success('Record Created ');
  },[newPatient])
  useEffect(()=>{
     //
     if(mode==='edit' && record){
          const formValue = convertToForm(record);
          console.log(`Setting`);
          console.log(formValue)
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

    <Stack  direction={'row'} spacing={1} m={1}  p={1}  justifyContent={'end'}>
               <Button  type='submit' variant='contained'  >{mode==='create'?'CREATE':'UPDATE'}</Button>
               <Button  variant='contained' color='error' onClick={ onClose!==undefined ? onClose: ()=>{
                  //
                } } >CLOSE</Button>
      </Stack>
      <Grid container spacing={4} >
           <Grid item md={2}>
                <TextField InputLabelProps={{shrink:true}} required error={ errors['name']!==undefined }
                    label='First Name' {...register('name',{required:true,})}   fullWidth />
           </Grid>
           <Grid item md={2}>
                <TextField InputLabelProps={{shrink:true}} required error={ errors['name']!==undefined }
                    label='Middle Name' {...register('givenname',{required:true,})}   fullWidth />
           </Grid>
           <Grid item md={2}>
                <TextField InputLabelProps={{shrink:true}} required error={ errors['name']!==undefined }
                    label='Last Name' {...register('lastname',{required:true,})}   fullWidth />
           </Grid>

           <Grid item md={3}>
                <TextField label='Mobile Number' InputLabelProps={{shrink:true}} error={errors['mobileno']!==undefined}
                         helperText={ errors['mobileno']? 'Must be 10 digits':null}
                    {...register('mobileno',{minLength:10,} )}    fullWidth />
           </Grid>
           <Grid item md={3}>
                <TextField label='MRN'  {...register('uid')} fullWidth placeholder='Unique Identifier Number' />
           </Grid>
           <Grid item md={3}>
                <TextField type={'abha'} {...register('abha')}  InputLabelProps={{shrink:true}} label='ABHA Number'   fullWidth   />
           </Grid>
           <Grid item md={3}>
                <TextField type={'abha'} {...register('aadhaar')}  InputLabelProps={{shrink:true}} label='Aadhaar Number'   fullWidth   />
           </Grid>
           <Grid item md={3}>
                <TextField type={'date'} {...register('birthDate')}  InputLabelProps={{shrink:true}} label='Date Of Birth'   fullWidth   />
           </Grid>
           <Grid item md={3}>
                <TextField label='Gender' {...register('gender',)}  select  defaultValue={record?.gender||''} fullWidth placeholder='Gender' >
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



    </div>
      </form>
  );
}

export default PatientsEdit;
