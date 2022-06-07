import styles from './administrative.module.scss';
import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';

/* eslint-disable-next-line */
export interface AdministrativeProps {}

let newList:any = [];

export function Administrative(props: AdministrativeProps) {

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

            <Grid item md={3}>
                <TextField {...register('state')}  label='Urgency' select fullWidth placeholder='Urgency' >
                    <MenuItem value='In progress'>In progress</MenuItem>
                </TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('chief_complaint')}  label='Appointment' fullWidth placeholder='Appointment' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Next Appointment' fullWidth placeholder='Next Appointment' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Derived from' fullWidth placeholder='Derived from' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Derived to' fullWidth placeholder='Derived to' ></TextField>
            </Grid>

            <Grid item md={3}>
                <TextField {...register('source')}  label='Institution' fullWidth placeholder='Institution' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Specialty' fullWidth placeholder='Specialty' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Type' fullWidth placeholder='Type' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='IPC' fullWidth placeholder='IPC' ></TextField>
            </Grid>
            <Grid item md={3}>
                <TextField {...register('source')}  label='Patient wait time' fullWidth placeholder='Patient wait time' ></TextField>
            </Grid>

            <Grid item md={12}>
                  <TextField label='Other information related to this evaluation' {...register('present_illness')} multiline={true} rows={3} fullWidth />
            </Grid>
        </Grid>
        <br/>
        <Divider/>

        <p>Services</p>
        <Grid container spacing={2} >
            <Grid item md={6}>
                  <TextField label='Product' {...register('present_illness')} fullWidth />
            </Grid>
            <Grid item md={6}>
                  <TextField label='Service' {...register('present_illness')} fullWidth />
            </Grid>
            <Grid item md={12}>
            <Button type='submit' variant='outlined' style={{marginTop:10}} fullWidth >Update Service</Button>
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

export default Administrative;
