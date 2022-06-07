import styles from './opd-rx.module.scss';

/* eslint-disable-next-line */
export interface OpdRxProps {}

export function OpdRx(props: OpdRxProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OpdRx!</h1>
    </div>
  );
}

export default OpdRx;
