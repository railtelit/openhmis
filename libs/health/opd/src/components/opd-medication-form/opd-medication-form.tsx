import styles from './opd-medication-form.module.scss';

/* eslint-disable-next-line */
export interface OpdMedicationFormProps {}

export function OpdMedicationForm(props: OpdMedicationFormProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OpdMedicationForm!</h1>
    </div>
  );
}

export default OpdMedicationForm;
