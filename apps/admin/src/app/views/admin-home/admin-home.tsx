import styles from './admin-home.module.scss';

/* eslint-disable-next-line */
export interface AdminHomeProps {}

export function AdminHome(props: AdminHomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminHome!</h1>
    </div>
  );
}

export default AdminHome;
