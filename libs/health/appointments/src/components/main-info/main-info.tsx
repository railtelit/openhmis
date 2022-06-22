import styles from './main-info.module.scss';
import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface MainInfoProps {}

let newList:any = [];

export function MainInfo(props: MainInfoProps) {

  const {register,handleSubmit, control, formState:{errors,}, setValue,  setFocus }=useForm({    });

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     //const response = await axios.get('https://reqres.in/api/users');
  //     const response = await axios.get('http://at.erpapps.in/fhir/Patient?_count=10&name=');
  //     const posts = response.data.entry;

  //     console.log(posts)
  //     newList = [];
  //     for (var i = 0; i < posts.length; i++){

  //       newList.push(posts[i].resource.name[0].family)
  //     }

  //     console.log("newList- "+newList)

  //   }
  //   loadUsers()
  //   }, [])


  return (
    <div className={styles['container']}>

      <Grid container spacing={2} >

            <Grid item md={4}>
                <TextField {...register('chief_complaint')}  label='Chief Complaint' fullWidth placeholder='Chief Complaint' ></TextField>
            </Grid>

            <Grid item md={4}>
                <TextField {...register('source')}  label='Source' fullWidth placeholder='Source' ></TextField>
            </Grid>

            <Grid item md={4}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Reliable" />
                </FormGroup>
            </Grid>

            <Grid item md={12}>
                  <TextField label='Present Illness' {...register('present_illness')} multiline={true} rows={3} fullWidth />
            </Grid>

            <Grid item md={12}>
                  <TextField label='Clinical and Physical exam' {...register('clinical_physical_exam')} multiline={true} rows={3} fullWidth />
            </Grid>

            {/* <Grid item md={12}>
                <Autocomplete disablePortal id="combo-box-demo" options={newList} renderInput={(params) => <TextField {...register('participant.0.actor.display')} {...params} label="Main Condition" />}/>
            </Grid> */}

            <Grid item md={12}>
                  <TextField {...register('serviceCategory')}  label='Main Condition' select fullWidth placeholder='Main Condition' >
                      <MenuItem value='A00 : Cholera'>A00 : Cholera</MenuItem>
                      <MenuItem value='A04.9 : Bacterial intestinal infection, unspecified'>A04.9 : Bacterial intestinal infection, unspecified</MenuItem>
                      <MenuItem value='A00.1 : Cholera due to Vibrio cholerae 01, biovar eltor'>A00.1 : Cholera due to Vibrio cholerae 01, biovar eltor</MenuItem>
                      <MenuItem value='A00.9 : Cholera, unspecified'>A00.9 : Cholera, unspecified</MenuItem>
                      <MenuItem value='A01 : Typhoid and paratyphoid fevers'>A01 : Typhoid and paratyphoid fevers</MenuItem>
                      <MenuItem value='A01.0 : Typhoid fever'>A01.0 : Typhoid fever</MenuItem>
                      <MenuItem value='A01.1 : Paratyphoid fever A'>A01.1 : Paratyphoid fever A</MenuItem>
                      <MenuItem value='A01.2 : Paratyphoid fever B'>A01.2 : Paratyphoid fever B</MenuItem>
                      <MenuItem value='A01.3 : Paratyphoid fever C'>A01.3 : Paratyphoid fever C</MenuItem>
                      <MenuItem value='A01.4 : Paratyphoid fever, unspecified'>A01.4 : Paratyphoid fever, unspecified</MenuItem>

                  </TextField>
            </Grid>

            <Grid item md={12}>
                  <TextField label='Treatment Plan' {...register('treatment_plan')} multiline={true} rows={3} fullWidth />
            </Grid>

            <Grid item md={3}>
                <TextField {...register('state')}  label='State' select fullWidth placeholder='State' >
                    <MenuItem value='In progress'>In progress</MenuItem>
                </TextField>
            </Grid>

            <Grid item md={3}>
                  <TextField {...register('start')}   type='datetime-local'  InputLabelProps={{shrink:true}} label='Start' fullWidth   />
            </Grid>

            <Grid item md={3}>
                  <TextField {...register('end')}  type={'datetime-local'} InputLabelProps={{shrink:true}} label='End' fullWidth   />
            </Grid>

            <Grid item md={3}>
                <Button type='submit' variant='outlined' style={{marginTop:10}} fullWidth >Discharge</Button>
            </Grid>
        </Grid>
    </div>
  );
}

export default MainInfo;
