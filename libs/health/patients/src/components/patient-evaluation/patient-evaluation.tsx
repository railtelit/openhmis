import styles from './patient-evaluation.module.scss';

/* eslint-disable-next-line */
export interface PatientEvaluationProps {}

export function PatientEvaluation(props: PatientEvaluationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PatientEvaluation!</h1>
    </div>
  );
}

export default PatientEvaluation;
