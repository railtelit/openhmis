import styles from './validation.module.scss';
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
export interface ValidationProps {}

let newList:any = [];

export function Validation(props: ValidationProps) {

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

      <p>Document validation</p>

      <Grid container spacing={2} >

          <Grid item md={12}>
                <TextField label='Original String' {...register('present_illness')} multiline={true} rows={3} fullWidth />
          </Grid>
      </Grid>
      <br/>
      <Divider/>
      <p>Hashes</p>
      <Grid container spacing={2} >


            <Grid item md={12}>
                  <TextField label='Digest' {...register('treatment_plan')} multiline={true} rows={3} fullWidth />
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

export default Validation;
