import { BooleanField, NameField, ResourceTable, TelecomField } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Paper } from '@mui/material';
import styles from './health-practitioners.module.scss';

/* eslint-disable-next-line */
export interface HealthPractitionersProps {}

export function HealthPractitioners(props: HealthPractitionersProps) {
  const columns=[NameField({flex:1}),
        TelecomField('phone'),
        TelecomField('email',{headerName:'Email'}),
       BooleanField('active',{headerName:'Status'} ) ] ; 
   
  return (

    <div className={styles['container']}>
      <Paper sx={{p:3}} >
          <Pagetitle icon='account_circle' title='Health Practitioners'/>
          <ResourceTable columns={columns} resourceType='Practitioner' />
      </Paper>
    </div>
  );
}

export default HealthPractitioners;
