import { Pagetitle } from '@ha/shared-ui';
import { Container } from '@mui/system';
import styles from './opd-procedures-form.module.scss';

/* eslint-disable-next-line */
export interface OpdProceduresFormProps {}

export function OpdProceduresForm(props: OpdProceduresFormProps) {
  return (
    <div className={styles['container']}>      
      <Container>
              <Pagetitle title='Procedures' />
      </Container>
    </div>
  );
}

export default OpdProceduresForm;
