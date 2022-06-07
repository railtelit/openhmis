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

          <Grid item md={3}>
              <TextField {...register('temperature')} type='number'  label='Body Temp.(F)' fullWidth placeholder='Body Temp.(F)' ></TextField>
          </Grid>
          <Grid item md={3}>
              <TextField {...register('systolic_pressure')} type='number'  label='Resp. Rate' fullWidth placeholder='Resp. Rate' ></TextField>
          </Grid>
          <Grid item md={3}>
              <TextField {...register('diastolic_pressure')}  type='number' label='Pulse Rate' fullWidth placeholder='Pulse Rate' ></TextField>
          </Grid>
          <Grid item md={3}>
              <TextField {...register('heart_rate')} type='number'  label='SPO2' fullWidth placeholder='SPO2' ></TextField>
          </Grid>

      </Grid>

      <Grid container spacing={2} >
          <Grid item md={12}>
              <p>BP(mmHg)</p>
              <Grid container spacing={2} >
                  <Grid item md={4}>
                      <TextField {...register('heart_rate')} type='text'  label='Systolic' fullWidth placeholder='Systolic' ></TextField>
                  </Grid>
                  <Grid item md={4}>
                      <TextField {...register('heart_rate')} type='text'  label='Diastolic' fullWidth placeholder='Diastolic' ></TextField>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
      <br/>
      <Divider/>
      <br/>
      <Grid container spacing={2} >
          <Grid item md={4}>
              <TextField {...register('temperature')} type='number'  label='Weight (Kg)' fullWidth placeholder='Weight (Kg)' ></TextField>
          </Grid>
          <Grid item md={4}>
              <TextField {...register('systolic_pressure')} type='number'  label='Height(cms)' fullWidth placeholder='Height(cms)' ></TextField>
          </Grid>
          <Grid item md={4}>
              <TextField {...register('diastolic_pressure')}  type='number' label='BMI' fullWidth placeholder='BMI' ></TextField>
          </Grid>
      </Grid>
      <br/>
      <Divider/>
      <Grid container spacing={2} >
          <Grid item md={12}>
              <p>Blood Sugar Levels(mg/dl)</p>
              <Grid container spacing={2} >
                  <Grid item md={4}>
                      <TextField {...register('heart_rate')} type='text'  label='Fasting' fullWidth placeholder='Fasting' ></TextField>
                  </Grid>
                  <Grid item md={4}>
                      <TextField {...register('heart_rate')} type='text'  label='Postprandial' fullWidth placeholder='Postprandial' ></TextField>
                  </Grid>
                  <Grid item md={4}>
                      <TextField {...register('heart_rate')} type='text'  label='HBA1C' fullWidth placeholder='HBA1C' ></TextField>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>

      <br />
      <Grid container spacing={2} >
          <Grid item md={12}>
              <TextField {...register('temperature')} type='text'  label='Remarks' fullWidth placeholder='Remarks' ></TextField>
          </Grid>
      </Grid>

      <br/>
      {/* <Grid container spacing={2} >
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
      </Grid> */}

    </div>
  );
}

export default Clinical;
