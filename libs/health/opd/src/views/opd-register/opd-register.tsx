import { useFhirQuery } from '@ha/appfhir';
import styles from './opd-register.module.scss';

/* eslint-disable-next-line */
export interface OpdRegisterProps {}

export function OpdRegister(props: OpdRegisterProps) {
  const [departments]=useFhirQuery('Organization',{});
  return (
    <div className={styles['container']}>
          
    </div>
  );
}

export default OpdRegister;
