import styles from './hipu-helpdesk.module.scss';

/* eslint-disable-next-line */
export interface HipuHelpdeskProps {}

export function HipuHelpdesk(props: HipuHelpdeskProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HipuHelpdesk!</h1>
    </div>
  );
}

export default HipuHelpdesk;
