import styles from './api-action-button.module.scss';

/* eslint-disable-next-line */
export interface ApiActionButtonProps {}

export function ApiActionButton(props: ApiActionButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApiActionButton!</h1>
    </div>
  );
}

export default ApiActionButton;
