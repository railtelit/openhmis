import { ResourceTable } from '@ha/appfhir';
import { ActionButton, ColumnConfig, Pagetitle } from '@ha/shared-ui';
import { Container, Grid, Stack, TextField } from '@mui/material';
import styles from './opd-allergic-form.module.scss';

/* eslint-disable-next-line */
export interface OpdAllergicFormProps {}

export function OpdAllergicForm(props: OpdAllergicFormProps) {
  const columns:ColumnConfig[]=[{headerName:'Allergy',field:'allergy'},{headerName:'Entered Date',field:'date'}]
  return (
    <div className={styles['container']}>
        <Container>
              <Pagetitle title='Allergies'/>
               <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <TextField fullWidth label='Allergy' multiline rows={3} />
                    <ActionButton label='Add' />
               </Stack>
              <ResourceTable  resourceType='Observation' columns={columns} />
        </Container>
    </div>
  );
}

export default OpdAllergicForm;
