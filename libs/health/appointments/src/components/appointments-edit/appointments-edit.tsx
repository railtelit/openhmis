import { Button, ButtonGroup, Grid, MenuItem, TextField } from '@mui/material';
import styles from './appointments-edit.module.scss';

/* eslint-disable-next-line */
export interface AppointmentsEditProps {}

export function AppointmentsEdit(props: AppointmentsEditProps) {
  return (
    <div className={styles['container']}>
      <Grid container spacing={2} >
           <Grid item md={4}>
                <TextField label='Appointment ID' fullWidth />
           </Grid>
           <Grid item md={4}>
                <TextField label='Institution' fullWidth />
           </Grid>
           <Grid item md={4}>
                <TextField label='Impatient Registration' fullWidth />
           </Grid>


           <Grid item md={4}>
                <TextField label='Patient' fullWidth />
           </Grid>
           <Grid item md={4}>
                <TextField type={'datetime-local'} InputLabelProps={{shrink:true}} label='Date and Time' fullWidth   />
           </Grid>
           <Grid item md={4}>
                <TextField type={'datetime-local'} InputLabelProps={{shrink:true}} label='End Date and Time' fullWidth   />
           </Grid>


           <Grid item md={4}>
                <TextField label='Visit' select fullWidth placeholder='Visit' >
                     <MenuItem value=''>New Health Conditon</MenuItem>
                     <MenuItem value=''>Followup</MenuItem>
                     <MenuItem value=''>Well Child visit</MenuItem>
                     <MenuItem value=''>Well Woman visit</MenuItem>
                     <MenuItem value=''>Well Man visit</MenuItem>
                </TextField>
           </Grid>
           <Grid item md={4}>
                <TextField label='Urgency' select fullWidth placeholder='Urgency' >
                     <MenuItem value='Normal'>Normal</MenuItem>
                     <MenuItem value='Urgent'>Urgent</MenuItem>
                     <MenuItem value='Medical Urgency'>Medical Urgency</MenuItem>
                </TextField>
           </Grid>
           <Grid item md={4}>
                <TextField label='Type' select fullWidth placeholder='Type' >
                     <MenuItem value='Outpatient'>Outpatient</MenuItem>
                     <MenuItem value='Inpatient'>Inpatient</MenuItem>
                </TextField>
           </Grid>


           <Grid item md={4}>
                <TextField label='State' select fullWidth placeholder='State' >
                     <MenuItem value='Confirmed'>Confirmed</MenuItem>
                     <MenuItem value='Checked In'>Checked In</MenuItem>
                     <MenuItem value='Done'>Done</MenuItem>
                     <MenuItem value='Cancelled by patient'>Cancelled by patient</MenuItem>
                     <MenuItem value='Cancelled by Health Center'>Cancelled by Health Center</MenuItem>
                     <MenuItem value='No Show'>No Show</MenuItem>
                </TextField>
           </Grid>
           <Grid item xs={8}></Grid>
           <Grid item md={8}>
                <TextField label='Health Prof' fullWidth placeholder='Health Prof' ></TextField>
           </Grid>
           <Grid item md={4}>
                <TextField label='Specialty' fullWidth placeholder='Specialty' ></TextField>
           </Grid>
           <Grid item md={12}>
                <TextField label='Information' multiline={true} rows={3} fullWidth />
           </Grid>

      </Grid>
      <Grid container spacing={2} sx={{padding:4}}  justifyContent={'end'}>
           <ButtonGroup >
               <Button  variant='contained' >SAVE</Button>
           </ButtonGroup>
      </Grid>
    </div>
  );
}

export default AppointmentsEdit;
