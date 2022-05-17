import { useEffect } from 'react';
import styles from './health-patients.module.scss';

/* eslint-disable-next-line */
export interface HealthPatientsProps {}

export function HealthPatients(props: HealthPatientsProps) {

  useEffect(()=>{
        fetch('http://fhir.erpapps.in/fhir/Patient/123').then(res=>{
           console.log('Patients Loaded '); 

         });
  },[])

  return (
    <div className={styles['container']}>
      <h1>Welcome to HealthPatients!</h1>
    </div>
  );
}

export default HealthPatients;
