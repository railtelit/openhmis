import { Button, ButtonGroup, Grid, MenuItem, TextField } from '@mui/material';
import styles from './patients-edit.module.scss';

/* eslint-disable-next-line */
export interface PatientsEditProps {}

export function PatientsEdit(props: PatientsEditProps) {
  return (
    <div className={styles['container']}>
      <Grid container spacing={2} >
           <Grid item md={6}>
                <TextField label='Name'    fullWidth />
           </Grid>
           
           <Grid item md={3}>
                <TextField label='Mobile Number'   fullWidth />
           </Grid>
           <Grid item md={3}>
                <TextField label='PUID'   fullWidth placeholder='Unique Identifier Number' />
           </Grid>
           <Grid item md={3}>
                <TextField type={'date'}   InputLabelProps={{shrink:true}} label='Date Of Birth'   fullWidth   />
           </Grid>
           <Grid item md={3}>
                <TextField label='Gender'   select   fullWidth placeholder='Gender' >
                     <MenuItem value='male'>Male</MenuItem>
                     <MenuItem value='female'>Female</MenuItem>
                </TextField>
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

export default PatientsEdit;
