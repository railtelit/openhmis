import { TextField } from '@mui/material';
import styles from './userdashboard.module.scss';

/* eslint-disable-next-line */
export interface UserdashboardProps {}

export function Userdashboard(props: UserdashboardProps) {
  return (
    <div className={styles['container']}>

      <TextField label={'Search For Health Facility'} fullWidth />
      To Be Implemented...
    </div>
  );
}

export default Userdashboard;
