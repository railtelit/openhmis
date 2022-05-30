import { ResourceTable } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import styles from './health-practitioners.module.scss';

/* eslint-disable-next-line */
export interface HealthPractitionersProps {}

export function HealthPractitioners(props: HealthPractitionersProps) {
  return (
    <div className={styles['container']}>
      <Pagetitle icon='account_circle' title='Health Practitioners'/>

      <ResourceTable />
    </div>
  );
}

export default HealthPractitioners;
