import styles from './patient-care.module.scss';
import { Avatar, Box, Container, Grid, Input, Stack, Tab, TextField, Typography ,Paper} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/* eslint-disable-next-line */
export interface PatientCareProps {}

export function PatientCare(props: PatientCareProps) {
  return (
    <div className={styles['container']}>
      <h2>Vitals</h2>
      <Box style={{height:"70px",width:"200px",backgroundColor:"lightgray",textAlign:"center"}}>Blood Pressure</Box>
      <br></br>
      <Grid container spacing={110}>
        <Grid item xs={6}>
        <h2>Care Plan</h2>
        </Grid>

        <Grid item xs={6}>
        Add Focus +
        </Grid>
      </Grid>

      <span style={{marginLeft:"280px"}}>PAIN</span>
      <br></br>

      <span style={{marginLeft:"280px"}}><b>10th June</b></span>
      <span style={{marginLeft:"220px"}}><b>11th June</b></span>
      <span style={{marginLeft:"220px"}}><b>12th June</b></span>

      <Grid container spacing={3}>
      <Grid item xs={2}>
          <b>9 AM</b>
        </Grid>
        <Grid item xs={3}>

          <Box style={{height:"70px",backgroundColor:"lightyellow"}}><i>ECG<br></br>Clinical Note<br></br>
          Asp/</i></Box>
        </Grid>
        <Grid item xs={3}>
          <Box style={{height:"70px",backgroundColor:"lightgray"}}> </Box>
        </Grid>
        <Grid item xs={3}>
          <Box style={{height:"70px",backgroundColor:"lightgray"}}> </Box>
        </Grid>
      </Grid>
     <br></br>
      <Grid container spacing={3}>
      <Grid item xs={2}>
          <b>12 PM</b>
        </Grid>
        <Grid item xs={3}>
          <Box style={{height:"70px",backgroundColor:"lightpink"}}><i>Acetamenphen 1d</i></Box>
        </Grid>

      </Grid>
      <br></br>
      <Grid container spacing={3}>
      <Grid item xs={2}>
      <AddCircleIcon style={{color:"red"}} />
        </Grid>


      </Grid>
    </div>
  );
}

export default PatientCare;
