import styles from './health-configurations.module.scss';

/* eslint-disable-next-line */
export interface HealthConfigurationsProps {}

export function HealthConfigurations(props: HealthConfigurationsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HealthConfigurations!</h1>
    </div>
  );
}

export default HealthConfigurations;
