import styles from './health-appointments.module.scss';

/* eslint-disable-next-line */
export interface HealthAppointmentsProps {}

export function HealthAppointments(props: HealthAppointmentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HealthAppointments!</h1>
    </div>
  );
}

export default HealthAppointments;
