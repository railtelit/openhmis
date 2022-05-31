import { useFhirQuery, useFhirResource } from '@ha/appfhir';
import { Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './patient-evaluation.module.scss';

/* eslint-disable-next-line */
export interface PatientEvaluationProps {
  onClose?:()=>void,
}

export function PatientEvaluation({onClose=()=>{const i = true }}: PatientEvaluationProps) {
  const {id}=useParams();
  const [record,error,loaddata] = useFhirQuery('Patient',{_id:id})
  useEffect(()=>{
        if(loaddata)
            loaddata();
  },[])
  return (
    <div className={styles['container']}>

      <h1>Welcome to PatientEvaluation {id}  !</h1>
    </div>
  );
}

export default PatientEvaluation;
