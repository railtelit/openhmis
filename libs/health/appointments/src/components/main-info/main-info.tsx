import styles from './main-info.module.scss';

/* eslint-disable-next-line */
export interface MainInfoProps {}

export function MainInfo(props: MainInfoProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MainInfo!</h1>
    </div>
  );
}

export default MainInfo;
