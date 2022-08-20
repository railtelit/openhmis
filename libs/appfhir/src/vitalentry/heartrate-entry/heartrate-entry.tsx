import styles from './heartrate-entry.module.scss';

/* eslint-disable-next-line */
export interface HeartrateEntryProps {}

export function HeartrateEntry(props: HeartrateEntryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HeartrateEntry!</h1>
    </div>
  );
}

export default HeartrateEntry;
