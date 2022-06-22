import { ResourceTable } from '@ha/appfhir';
import { ActionButton, ColumnConfig, Pagetitle, SelectOptions } from '@ha/shared-ui';
import { Divider, Grid, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import styles from './opd-diagnosis-form.module.scss';

/* eslint-disable-next-line */
export interface OpdDiagnosisFormProps {}

export function OpdDiagnosisForm(props: OpdDiagnosisFormProps) {
    const columns:ColumnConfig[]=[{headerName:'Condition',flex:1,field:'value'},
            {headerName:'Remarks',field:'remarks'},{headerName:'EntryDate',field:'entrydate'}]
    const conditionstatus:string[] =['PROVISIONAL','FINAL']
  return (
    <div className={styles['container']}>
      <Container>
            <Pagetitle  title='Diagnosis'/>
           <Stack direction={'row'} spacing={2} alignItems={'center'}>
                 <TextField  label='Diagnosis Name' fullWidth/>
                 <TextField  label='Side'/>
                 <SelectOptions  label='Status' options={conditionstatus} />
                 <ActionButton  label='Add'/>
           </Stack>
           <ResourceTable  resourceType='Condition' columns={columns}/>
           <Divider sx={{my:2}} />
           <TextField  label='Diagnosis Note'  multiline rows={2} placeholder='Enter Text Here...' fullWidth/>
           <Grid container justifyContent={'end'} > <ActionButton  label={'Save Note'}/> </Grid>
      </Container>
    </div>
  );
}

export default OpdDiagnosisForm;
