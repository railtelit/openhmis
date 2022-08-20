import styles from './bloodgroup-entry.module.scss';

/* eslint-disable-next-line */
export interface BloodgroupEntryProps {}

export function BloodgroupEntry(props: BloodgroupEntryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BloodgroupEntry!</h1>
    </div>
  );
}

export default BloodgroupEntry;
