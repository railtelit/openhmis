import { ResourceTable } from '@ha/appfhir';
import { SelectOptions, ActionButton, ColumnConfig, Pagetitle } from '@ha/shared-ui';
import { Grid, TextField, Divider } from '@mui/material';
import { SIDES } from '../../lib/contants';
import styles from './opd-chronic-form.module.scss';

/* eslint-disable-next-line */
export interface OpdChronicFormProps {}

export function OpdChronicForm(props: OpdChronicFormProps) {
  const columns:ColumnConfig[] =[]
  return (
    <div className={styles['container']}>
      <Pagetitle  title={'Chronic Disease'}/>
         <Grid container flex={1} spacing={2}  alignItems={'center'}>
      <Grid item md={6} > <TextField fullWidth label="Chronic Disease" /> </Grid>
      <Grid item md={2} > <TextField fullWidth label="Duration" /> </Grid>      
      <Grid item md={3} > <TextField fullWidth label="Remarks" /> </Grid>      
      <Grid item> <ActionButton  label='Add' /> </Grid>
      </Grid>
      <Divider/>
      <ResourceTable resourceType='Observation' columns={columns} />
    </div>
  );
}

export default OpdChronicForm;
