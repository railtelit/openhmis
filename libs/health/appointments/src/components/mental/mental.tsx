import styles from './Mental.module.scss';
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
export interface MentalProps {}

let newList:any = [];

export function Mental(props: MentalProps) {

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

          <Grid item md={12}>
              <TextField {...register('psy_assessment')} label='Psychological Assessment' placeholder='Psychological Assessment' multiline={true} rows={4} fullWidth ></TextField>
          </Grid>
      </Grid>
      <br/>
      <Divider/>

      <p>Glasgow Coma Scale</p>
      <Grid container spacing={2} >
          <Grid item md={6}>
              <TextField {...register('glasgow')} type='number'  label='Glasgow' fullWidth placeholder='Glasgow' ></TextField>
          </Grid>
          <Grid item md={6}>
              <TextField {...register('glasgow_eyes')}  type='number' label='Glasgow - Eyes' select fullWidth placeholder='Glasgow - Eyes' >
                  <MenuItem value='Does not Open Eyes'>Does not Open Eyes</MenuItem>
                  <MenuItem value='Opens eyes in response to painful stimuli'>Opens eyes in response to painful stimuli</MenuItem>
                  <MenuItem value='Opens eyes in response to voice'>Opens eyes in response to voice</MenuItem>
                  <MenuItem value='Opens eyes spontaneously'>Opens eyes spontaneously</MenuItem>
              </TextField>
          </Grid>
          <Grid item md={6}>
              <TextField {...register('glasgow_verbal')} type='number' select  label='Glasgow - Verbal' fullWidth placeholder='Glasgow - Verbal' >
                  <MenuItem value='Makes no sounds'>Makes no sounds</MenuItem>
                  <MenuItem value='Incomprehensible sounds'>Incomprehensible sounds</MenuItem>
                  <MenuItem value='Utters inappropriate words'>Utters inappropriate words</MenuItem>
                  <MenuItem value='Confused, Disoriented'>Confused, Disoriented</MenuItem>
                  <MenuItem value='Oriented, converses normally'>Oriented, converses normally</MenuItem>
              </TextField>
          </Grid>
          <Grid item md={6}>
              <TextField {...register('glasgow_motor')}  type='number' select label='Glasgow - Motor' fullWidth placeholder='Glasgow - Motor' >
                  <MenuItem value='Makes no movement'>Makes no movement</MenuItem>
                  <MenuItem value='Extension to painful stimuli - decerebrate response'>Extension to painful stimuli - decerebrate response</MenuItem>
                  <MenuItem value='Abnormal flexion to painful stimuli (decorticate response)'>Abnormal flexion to painful stimuli (decorticate response)</MenuItem>
                  <MenuItem value='Flexion/Withdrawal to painful stimuli'>Flexion/Withdrawal to painful stimuli</MenuItem>
                  <MenuItem value='Localizes painful stimuli'>Localizes painful stimuli</MenuItem>
                  <MenuItem value='Obeys Commands'>Obeys Commands</MenuItem>
              </TextField>
          </Grid>
      </Grid>
      <br/>
      <Divider/>

      <p>Mental Assessment and Impairments</p>

      <Grid container spacing={2} >

          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Violent Behaviour" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Praxis" />
              </FormGroup>
          </Grid>
          <Grid item md={6}>
              <TextField {...register('mood')} type='number' select  label='Mood' fullWidth placeholder='Mood' >
                  <MenuItem value='Normal'>Normal</MenuItem>
                  <MenuItem value='Sad'>Sad</MenuItem>
                  <MenuItem value='Fear'>Fear</MenuItem>
                  <MenuItem value='Rage'>Rage</MenuItem>
                  <MenuItem value='Happy'>Happy</MenuItem>
                  <MenuItem value='Disgust'>Disgust</MenuItem>
                  <MenuItem value='Euphoria'>Euphoria</MenuItem>
                  <MenuItem value='Flat'>Flat</MenuItem>
              </TextField>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Orientation" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Memory" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Knowledge of Current Events" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Judgment" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Abstraction" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Vocabulary" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Calculation Ability" />
              </FormGroup>
          </Grid>
          <Grid item md={3}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Object Recognition" />
              </FormGroup>
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

export default Mental;
