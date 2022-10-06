import { useKeycloak } from '@ha/authstore';
import { useEffect } from 'react';
import styles from './logout.module.scss';

/* eslint-disable-next-line */
export interface LogoutProps {}

export function Logout(props: LogoutProps) {
  const kc=useKeycloak(); 
  useEffect(()=>{
    
        kc?.logout();
  },[])
  return (
    <div className={styles['container']}>
       Loggin Out .. 
    </div>
  );
}

export default Logout;
