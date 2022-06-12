import { ResourceTable, SnomedAutoComplete } from '@ha/appfhir';
import { ColumnConfig, Pagetitle } from '@ha/shared-ui';
import { Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useForm } from 'react-hook-form';
import styles from './opd-procedures-form.module.scss';

/* eslint-disable-next-line */
export interface OpdProceduresFormProps {}

export function OpdProceduresForm(props: OpdProceduresFormProps) {
  const {control}=useForm(); 
  const columns:ColumnConfig[]=[ {field:'procedure_name',headerName:'Procedure'} ]; 
  return (
    <div className={styles['container']}>      
      <Container>
              <Pagetitle  title='Procedures / Service Request' />

              <Grid container spacing={1} >  
                  <Grid item md={12}>
                      <SnomedAutoComplete control={control} name='procedure' placeholder='Procedure Name' />
                  </Grid>
                  <Grid item md={4}>
                      <SnomedAutoComplete control={control} name='body_part' placeholder='Body Part' />
                  </Grid>                  
                  <Grid item md={8}>
                      <TextField  name='instruction' placeholder='Patient Instruction' />
                  </Grid>
                  <Grid item md={4}>
                         <Button>Add Procedure Order</Button>
                  </Grid>
              </Grid>
              <ResourceTable resourceType='ServiceRequest' columns={columns} />
               
      </Container>
    </div>
  );
}

export default OpdProceduresForm;
