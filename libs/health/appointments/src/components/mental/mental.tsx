import styles from './mental.module.scss';

/* eslint-disable-next-line */
export interface MentalProps {}

export function Mental(props: MentalProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Mental!</h1>
    </div>
  );
}

export default Mental;
