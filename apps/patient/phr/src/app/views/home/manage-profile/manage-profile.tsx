import styles from './manage-profile.module.scss';

/* eslint-disable-next-line */
export interface ManageProfileProps {}

export function ManageProfile(props: ManageProfileProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ManageProfile!</h1>
    </div>
  );
}

export default ManageProfile;
