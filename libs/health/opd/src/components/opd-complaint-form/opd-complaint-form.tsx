import { Divider, Grid, Select, TextField } from '@mui/material';
import styles from './opd-complaint-form.module.scss';
import {ActionButton, ColumnConfig, Pagetitle, SelectOptions} from '@ha/shared-ui'
import { ResourceTable } from '@ha/appfhir';
/* eslint-disable-next-line */
export interface OpdComplaintFormProps {}

export function OpdComplaintForm(props: OpdComplaintFormProps) {
  const SIDES=['NR','LEFT','RIGHT','BILATERAL']
  const columns:ColumnConfig[]=[]
  return (
    <div className={styles['container']}>
      <Pagetitle  title='Complaints'/>
      <Grid container flex={1} spacing={2}  alignItems={'center'}>
      <Grid item md={6} > <TextField fullWidth label="Chief Complaint" /> </Grid>
      <Grid item md={2}> <SelectOptions label={'Side'} options={SIDES} /> </Grid>
      <Grid item> <ActionButton  label='Add' /> </Grid>
      </Grid>
      <Divider/>
      <ResourceTable resourceType='Observation' columns={columns} />
    </div>
  );
}

export default OpdComplaintForm;
