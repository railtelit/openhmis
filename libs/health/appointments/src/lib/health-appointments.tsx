import styles from './health-appointments.module.scss';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import AppointmentsHome from '../views/appointments-home/appointments-home';

/* eslint-disable-next-line */
export interface HealthAppointmentsProps {}

export function HealthAppointments(props: HealthAppointmentsProps) {

  return (
    <div className={styles['container']}>
       <Box>
           <AppointmentsHome/>
       </Box>
    </div>
  );
}

export default HealthAppointments;
