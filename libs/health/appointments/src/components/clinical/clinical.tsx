import styles from './clinical.module.scss';
import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

/* eslint-disable-next-line */
export interface ClinicalProps {}

let newList:any = [];

export function Clinical(props: ClinicalProps) {

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

      <p>Vital Signs</p>

      <Grid container spacing={2} >

          <Grid item md={2}>
              <TextField {...register('temperature')} type='number'  label='Temperature' fullWidth placeholder='Temperature' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('systolic_pressure')} type='number'  label='Systolic Pressure' fullWidth placeholder='Systolic Pressure' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('diastolic_pressure')}  type='number' label='Diastolic Pressure' fullWidth placeholder='Diastolic Pressure' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('heart_rate')} type='number'  label='Heart Rate' fullWidth placeholder='Heart Rate' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('respiratory_rate')}  type='number' label='Respiratory Rate' fullWidth placeholder='Respiratory Rate' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('oxygen_saturation')}  type='number' label='Oxygen Saturation' fullWidth placeholder='Oxygen Saturation' ></TextField>
          </Grid>
      </Grid>
      <br/>
      <Divider/>

      <p>Anthropometry</p>

      <Grid container spacing={2} >

          <Grid item md={2}>
              <TextField {...register('weight')} type='number'  label='Weight' fullWidth placeholder='Weight' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('geight')} type='number'  label='Height' fullWidth placeholder='Height' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('bmi')}  type='number' label='BMI' fullWidth placeholder='BMI' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('waist')} type='number'  label='Waist' fullWidth placeholder='Waist' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('hip')}  type='number' label='Hip' fullWidth placeholder='Hip' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('whr')}  type='number' label='WHR' fullWidth placeholder='WHR' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('head')}  type='number' label='Head' fullWidth placeholder='Head' ></TextField>
          </Grid>
      </Grid>
      <br/>
      <Divider/>

      <p>Nutrition</p>

      <Grid container spacing={2} >
          <Grid item md={6}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Malnutrition" />
              </FormGroup>
          </Grid>
          <Grid item md={6}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Dehydration" />
              </FormGroup>
          </Grid>
      </Grid>

      <br/>
      <Divider/>

      <p>Signs and Symptoms</p>

      <Grid container spacing={2} >
          <Grid item md={12}>
              <TextField {...register('psy_assessment')} label='Sign or Symptom' placeholder='Sign or Symptom' multiline={true} rows={2} fullWidth ></TextField>
          </Grid>
          <Grid item md={12}>
              <TextField {...register('subjective')}  type='number' label='Subjective / Objective' select fullWidth placeholder='Subjective / Objective' >
                  {/* <MenuItem value='Does not Open Eyes'>Does not Open Eyes</MenuItem> */}
              </TextField>
          </Grid>
          <Grid item md={12}>
              <TextField {...register('comments')} label='Comments' placeholder='Comments' multiline={true} rows={2} fullWidth ></TextField>
          </Grid>
      </Grid>

      <br/>
      <Divider/>

      <p>Glucose and Lipids Profile</p>

      <Grid container spacing={2} >

          <Grid item md={2}>
              <TextField {...register('glycemia')} type='number'  label='Glycemia' fullWidth placeholder='Glycemia' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('hbA1c')} type='number'  label='HbA1c' fullWidth placeholder='HbA1c' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('last_cholesterol')}  type='number' label='Last Cholesterol' fullWidth placeholder='Last Cholesterol' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('hdl')} type='number'  label='HDL' fullWidth placeholder='HDL' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('ldl')}  type='number' label='Hip' fullWidth placeholder='LDL' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('tags')}  type='number' label='TAGs' fullWidth placeholder='TAGs' ></TextField>
          </Grid>
          <Grid item md={2}>
              <TextField {...register('head')}  type='number' label='Head' fullWidth placeholder='Head' ></TextField>
          </Grid>

      </Grid>
      <br/>
      <Grid container spacing={2} >
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

export default Clinical;
