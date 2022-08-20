import styles from './doctor-desk.module.scss';

/* eslint-disable-next-line */
export interface DoctorDeskProps {}

export function DoctorDesk(props: DoctorDeskProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DoctorDesk!</h1>
    </div>
  );
}

export default DoctorDesk;
