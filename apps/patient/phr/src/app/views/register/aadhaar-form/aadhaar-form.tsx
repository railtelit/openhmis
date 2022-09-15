import styled from '@emotion/styled';
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import styles from './aadhaar-form.module.scss';

/* eslint-disable-next-line */
export interface AadhaarFormProps {}

const TF=(props:TextFieldProps)=><TextField {...props} 
    variant={'standard'}
    fullWidth InputLabelProps={{shrink:true}} />
const OF=(props:{label:string,options:any[],selectprops:any})=><FormControl fullWidth variant='standard'>
      <InputLabel shrink> {props.label}</InputLabel>
      <Select fullWidth  {...props.selectprops} >
              {props.options?.map(o=><MenuItem value={o.value} key={o.value} > {o.label} </MenuItem>)}
      </Select>
</FormControl>


export function AadhaarForm(props: AadhaarFormProps) {
  const aform=useForm({defaultValues:{state:'',district:''}})
  const genderOptions=[{value:'M',label:'Male'},{value:'F',label:'Female'}]
  const [formValue,setFormValue]=useState<any>({})
  useEffect(()=>{
     //
    // aform.watch()
  },[])
  return (    
      <Grid container gap={4} alignItems={'center'} spacing={1}>
          <Grid item md={4}>
                <TF   label={'First Name'} />
          </Grid>
          <Grid item md={3}>
                <TF   label={'Middle Name'} />
          </Grid>
          <Grid item md={3}>
                <TF   label={'Last Name'} />
          </Grid>
          <Divider/>          
          <Grid item md={4}  >              
             <Typography variant='body2' >Date of Birth</Typography>
             <Stack direction={'row'} justifyContent={'space-around'} display={'flex'} >
                <TF  type={'number'} label={'Day '} />
                <TF type={'number'}  label={'Month '} />
                <TF type={'number'}  label={'Year '} />
             </Stack>
          </Grid>
          <Grid item  md={2}  alignSelf={'end'} >
               <FormControl fullWidth variant='standard'>
                  <InputLabel shrink  >Gender</InputLabel> 
                  <Select fullWidth label={'Gender'} variant='standard' >
                      {genderOptions.map((g)=><MenuItem value={g.value} key={g.value} >{g.label}</MenuItem>)}
                  </Select>
               </FormControl>
          </Grid>
           <Grid p={0} m={0} container item md={12} gap={2} spacing={1} >
              <Grid item md={3}>
                  <OF label='State' options={genderOptions} selectprops={{...aform.register('state')}} />
              </Grid>
              <Grid item md={3}>
                  <OF label='District' options={genderOptions} selectprops={{...aform.register('district')}} />
              </Grid>
              <Grid item md={2}>
                  <TF    label={'Pin Code'} />
              </Grid>
           </Grid>
           <Grid item container mx={4} justifyContent={'end'}>
                <Button variant='contained' >PROCEED</Button>
           </Grid>
      </Grid>
  );
}

export default AadhaarForm;
