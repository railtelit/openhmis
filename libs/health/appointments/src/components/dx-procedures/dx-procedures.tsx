import styles from './dx-procedures.module.scss';

/* eslint-disable-next-line */
export interface DxProceduresProps {}

export function DxProcedures(props: DxProceduresProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DxProcedures!</h1>
    </div>
  );
}

export default DxProcedures;
