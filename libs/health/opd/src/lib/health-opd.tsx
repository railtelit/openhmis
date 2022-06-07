import OpdHome from '../views/opd-home/opd-home';
import styles from './health-opd.module.scss';

/* eslint-disable-next-line */
export interface HealthOpdProps {}

export function HealthOpd(props: HealthOpdProps) {
  return (
    <div className={styles['container']} style={{padding:10}}>
          <OpdHome/>
    </div>
  );
}

export default HealthOpd;
