import { Route, Routes } from 'react-router-dom';
import OpdHome from '../views/opd-home/opd-home';
import OpdRx from '../views/opd-rx/opd-rx';
import styles from './health-opd.module.scss';

/* eslint-disable-next-line */
export interface HealthOpdProps {}

export function HealthOpd(props: HealthOpdProps) {
  return (
    <div className={styles['container']} style={{padding:2}}>
          <Routes>
              <Route path='/' element={<OpdHome/>} />
              <Route path='/rx' element={<OpdRx/>} />
          </Routes>
    </div>
  );
}

export default HealthOpd;
