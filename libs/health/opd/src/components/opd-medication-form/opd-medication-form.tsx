import { ResourceTable } from '@ha/appfhir';
import { ActionButton, ColumnConfig, Pagetitle } from '@ha/shared-ui';
import { Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import styles from './opd-medication-form.module.scss';
import {useForm} from 'react-hook-form'
import {SnomedAutoComplete}  from '@ha/appfhir'
/* eslint-disable-next-line */
export interface OpdMedicationFormProps {}

export function OpdMedicationForm(props: OpdMedicationFormProps) {
    const columns:ColumnConfig[]=[{ flex:1, headerName:'Drug Name',field:'name'},{headerName:'Dosage',field:'dosage'},
              {headerName:'Quantity',field:'quantity'}];
      const {control,formState,register,handleSubmit}=useForm(); 
      const onSubmit=(v:any)=>{
                         console.log(v);
      }           
  return (
    <div className={styles['container']}>
      
      <Container>      
        <Pagetitle  title='Medications'/>
        <form onSubmit={handleSubmit(onSubmit)} >
              <Grid container spacing={2} alignItems={'center'}>
                   <Grid item md={12}>
                         {/* <TextField  label='DrugName'  fullWidth/> */}
                         <SnomedAutoComplete semanticTag='clinical drug' control={control} name='drugname' />
                   </Grid>
                   <Grid item md={2}>
                         <TextField {...register('dosage')} label='Dosage' fullWidth/>
                   </Grid>
                   <Grid item md={2}>
                         <TextField  label='Frequency' fullWidth/>
                   </Grid>
                   <Grid item md={2}>
                         <TextField  label='Start Date' fullWidth/>
                   </Grid>
                   <Grid item md={2}>
                         <TextField  label='Days' type='number' fullWidth/>
                   </Grid>
                   <Grid item md={2}>
                         <TextField  label='Quantity' type='number' fullWidth/>
                   </Grid>
                   <Grid item>
                      <ActionButton type='submit'  label={'Add'}/>
                   </Grid>
              </Grid>
        </form>
        <ResourceTable resourceType='MedicationRequest' columns={columns} />
      </Container>
    </div>
  );
}

export default OpdMedicationForm;
