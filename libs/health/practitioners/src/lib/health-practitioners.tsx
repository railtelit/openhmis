import { NameField, ResourceTable } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import styles from './health-practitioners.module.scss';

/* eslint-disable-next-line */
export interface HealthPractitionersProps {}

export function HealthPractitioners(props: HealthPractitionersProps) {
  const columns=[NameField({flex:1})] ; 
   
  return (
    <div className={styles['container']}>
      <Pagetitle icon='account_circle' title='Health Practitioners'/>

      <ResourceTable columns={columns} resourceType='Practitioner' />
    </div>
  );
}

export default HealthPractitioners;
