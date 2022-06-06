import styles from './dx-procedures.module.scss';
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
import Typography from '@mui/material/Typography';

/* eslint-disable-next-line */
export interface DxProceduresProps {}

let newList:any = [];

export function DxProcedures(props: DxProceduresProps) {

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
              <TextField {...register('inf0_diagnosis')} label='Information on Diagnosis' placeholder='Information on Diagnosis' multiline={true} rows={4} fullWidth ></TextField>
          </Grid>
      </Grid>
      <br/>

      <br/>
      <Divider/>


      <Grid container spacing={2} >
          <Grid item md={6}>
              <p>Other Conditions</p>
              <Card>
                  <CardContent>
                      <Grid container spacing={2} >
                          <Grid item md={12}>
                              <TextField {...register('pathology')}  label='Pathology' fullWidth placeholder='Pathology' ></TextField>
                          </Grid>
                          <Grid item md={12}>
                              <TextField {...register('comments')}  label='Comments' fullWidth placeholder='Comments' ></TextField>
                          </Grid>
                      </Grid>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item md={6}>
              <p>Hypotheses / DDx</p>
              <Card>
                  <CardContent>
                      <Grid container spacing={2} >
                          <Grid item md={12}>
                              <TextField {...register('pathology')}  label='Pathology' fullWidth placeholder='Pathology' ></TextField>
                          </Grid>
                          <Grid item md={12}>
                              <TextField {...register('comments')}  label='Comments' fullWidth placeholder='Comments' ></TextField>
                          </Grid>
                      </Grid>
                  </CardContent>
              </Card>
          </Grid>
      </Grid>
      <br/>
      <Divider/>

      <Grid item md={6}>
          <p>Procedures</p>
          <Card>
              <CardContent>
                  <Grid container spacing={2} >
                      <Grid item md={12}>
                          <TextField {...register('procedures')}  label='Procedure' fullWidth placeholder='Procedure' ></TextField>
                      </Grid>
                      <Grid item md={12}>
                          <TextField {...register('comments')}  label='Comments' fullWidth placeholder='Comments' ></TextField>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
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

export default DxProcedures;
