import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import PatientsHome from '../views/patients-home/patients-home';
import styles from './health-patients.module.scss';

/* eslint-disable-next-line */
export interface HealthPatientsProps {}

export function HealthPatients(props: HealthPatientsProps) {

   
  return (
    <div className={styles['container']}>
       <Box>
           <PatientsHome/>
       </Box>
    </div>
  );
}

export default HealthPatients;
