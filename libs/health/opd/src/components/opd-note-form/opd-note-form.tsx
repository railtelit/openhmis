import styles from './opd-note-form.module.scss';

/* eslint-disable-next-line */
export interface OpdNoteFormProps {}

export function OpdNoteForm(props: OpdNoteFormProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to OpdNoteForm!</h1>
    </div>
  );
}

export default OpdNoteForm;
