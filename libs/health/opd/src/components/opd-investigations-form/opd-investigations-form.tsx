import { ResourceTable } from '@ha/appfhir';
import { ActionButton, ColumnConfig, Pagetitle, SelectOptions } from '@ha/shared-ui';
import { Container, Grid, Stack, TextField } from '@mui/material';
import styles from './opd-investigations-form.module.scss';

/* eslint-disable-next-line */
export interface OpdInvestigationsFormProps {}

export function OpdInvestigationsForm(props: OpdInvestigationsFormProps) {
  const URGENCY:string[]=['ROUTINE','URGENT'];
  const columns:ColumnConfig[]=[{headerName:'Test Name',field:'name'},{headerName:'Test Date',field:'testdate'}]
  return (
    <div className={styles['container']}>
      <Container>
            <Pagetitle  title='Lab Investigations'/>
            <Grid container >
               <Grid  item md={4}> <TextField label='Test Name' fullWidth /> </Grid>
               <Grid  item md={2} > <TextField label='Date' type={'date'} fullWidth/> </Grid>
               <Grid  item md={2}> <SelectOptions  label='Urgency' options={URGENCY}/> </Grid>
               <Grid  item > <TextField label='Remarks' fullWidth /> </Grid>
               <Grid  item alignItems={'end'} > <ActionButton label='Add'/> </Grid>
              </Grid>

              <ResourceTable resourceType='Procedure' columns={columns} />
              
      </Container>
    </div>
  );
}

export default OpdInvestigationsForm;
