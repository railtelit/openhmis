import styles from './manage-practitioner.module.scss';

/* eslint-disable-next-line */
export interface ManagePractitionerProps {}

export function ManagePractitioner(props: ManagePractitionerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ManagePractitioner!</h1>
    </div>
  );
}

export default ManagePractitioner;
