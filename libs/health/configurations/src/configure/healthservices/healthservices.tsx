import { CodeAutocomplete, SnomedAutoComplete, useFhirQuery } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './healthservices.module.scss';

/* eslint-disable-next-line */
export interface HealthservicesProps {
     managingOrg?:any
}

export function ConfigureHealthservices(props: HealthservicesProps) {
  const [servicelist,loadError,loadServices,deleteService,createService ]=useFhirQuery('HealthService');
  const [edithealthservice,setEditHealthService]=useState<any|null>(null); 
  const [showEdit,setshowEdit]=useState(false);
 
  const {control,getValues,setValue}=useForm({ });
  useEffect(()=>{
      // 
  },[]); 
  function showValues(){
       console.log(getValues())
  }
  return (
    <div className={styles['container']}>
      <Pagetitle title='Health Services'/>
      <Grid container spacing={1}>       
      <Grid item md={12} >
        <CodeAutocomplete multiple={true}  label='Service Category'
             name='category' onValueChange={(v)=>showValues()} control={control} resourceId='service-category' />
      </Grid>
      <Grid item md={12} >
        <CodeAutocomplete multiple={true}  label='Service Type'
             name='service-type' onValueChange={(v)=>showValues()} control={control} resourceId='service-type' />
      </Grid>
    
      <Grid item md={12} >
        <SnomedAutoComplete multiple={true}  control={control} name='speciality'  ecl='< 394658006'  queryConfig={{searchContext:'concepts',loadOnInit:true}}  />
      </Grid>
      </Grid>
      

      <Dialog open={showEdit} maxWidth='md'>
            <DialogTitle>Health Service</DialogTitle>
            <DialogContent>
                  {/* 
                      ListOfValues
                  */}                  
            </DialogContent>
            <DialogActions>
                  
            </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfigureHealthservices;
