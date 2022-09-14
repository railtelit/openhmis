import styles from './userdashboard.module.scss';

/* eslint-disable-next-line */
export interface UserdashboardProps {}

export function Userdashboard(props: UserdashboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Userdashboard!</h1>
    </div>
  );
}

export default Userdashboard;
