import { Grid, Icon, IconButton, Paper, Table } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AppointmentsEdit from '../../components/appointments-edit/appointments-edit';
import AppointmentsList from '../../components/appointments-list/appointments-list';
import styles from './Appointments-home.module.scss';

/* eslint-disable-next-line */
export interface AppointmentsHomeProps {}

 type MODE=('edit'|'list'|'create')

export function AppointmentsHome(props: AppointmentsHomeProps) {
  const [mode,setMode]=useState<MODE>('list');

  function toggleMode(){
         setMode(mode==='list'?'edit':'list');
  }
  return (
    <div className={styles['container']}>
        <Grid container spacing={{sm:1}} justifyContent='flex-start' border={0} sx={{padding:1}} >
             { mode==='list'? <IconButton onClick={toggleMode} ><Icon>edit</Icon></IconButton>
                 : <IconButton onClick={toggleMode} ><Icon>list</Icon></IconButton>
             }
        </Grid>
        <Box component={Paper} sx={{padding:2}}>
          {mode==='list'?<AppointmentsList create_action={()=>setMode('edit')}/>:<AppointmentsEdit/>}
        </Box>
    </div>
  );
}

export default AppointmentsHome;
