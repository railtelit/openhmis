import styles from './health-dashboard.module.scss';

/* eslint-disable-next-line */
export interface HealthDashboardProps {}

export function HealthDashboard(props: HealthDashboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HealthDashboard!</h1>
    </div>
  );
}

export default HealthDashboard;
