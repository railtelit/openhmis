import styles from './clinical.module.scss';

/* eslint-disable-next-line */
export interface ClinicalProps {}

export function Clinical(props: ClinicalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Clinical!</h1>
    </div>
  );
}

export default Clinical;
