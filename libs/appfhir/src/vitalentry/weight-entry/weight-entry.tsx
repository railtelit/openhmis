import styles from './weight-entry.module.scss';

/* eslint-disable-next-line */
export interface WeightEntryProps {}

export function WeightEntry(props: WeightEntryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WeightEntry!</h1>
    </div>
  );
}

export default WeightEntry;
