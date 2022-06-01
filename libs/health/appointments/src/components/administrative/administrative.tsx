import styles from './administrative.module.scss';

/* eslint-disable-next-line */
export interface AdministrativeProps {}

export function Administrative(props: AdministrativeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Administrative!</h1>
    </div>
  );
}

export default Administrative;
