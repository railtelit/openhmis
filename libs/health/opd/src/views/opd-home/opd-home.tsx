import { NameField, ResourcerefAutocomplete, ResourceTable, SimpleActionField, useFhirQuery  } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Table, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Organization } from 'fhir/r4';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import OpdRegister from '../opd-register/opd-register';
import styles from './opd-home.module.scss';

/* eslint-disable-next-line */
export interface OpdHomeProps {}



export function OpdHome(props: OpdHomeProps) {

  const options:any[]=[]; 
  const [showregister,setshowregister]=useState(false);
  const [depts,deptloaderror,getdepts ]=useFhirQuery<Organization>('Organization',{type:'dept'})
  const encounterForm=useForm({});

  useEffect(()=>{
      // Load Dept Options
      getdepts(); 
  },[]);
  function onCreate(formValue:any){
      console.log(formValue)
  }

  const columns:GridColDef[]=[ NameField({flex:1 }),{headerName:'Age',field:'age'},{headerName:'Contact',field:'contact'}
              ,{headerName:'Entry Date',field:'end'} ,  SimpleActionField( {label:'Vital',actionName:'vitalentry',} ) ,
                 SimpleActionField({label:'Rx',actionName:'rx',navigateTo:'rx'})  
            ]
  return (
    <div className={styles['container']}>
        <form onSubmit={encounterForm.handleSubmit(onCreate)}>
          <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={1}  alignContent={'center'} >
                <Grid item slot={'start'}  > <Pagetitle icon='medical_services' title='OPD Desk'/> </Grid>
                <Grid item slot={'end'}  > <Button variant={'contained'} onClick={()=>setshowregister(true)}>NEW DIRECT REGISTRATION</Button>  </Grid>
          </Grid>
                <Grid container   >
                        <Grid item md={4}>
                          <ResourcerefAutocomplete label={'Department'} name='serviceProvider' params={{type:'dept'}} getOptionLabel={(r)=>r.name}
                             resourceType='Organization' control={encounterForm.control} />
                        </Grid>
                        <Grid item>
                           <Button type='submit'>Create</Button>
                        </Grid>
                </Grid>                
          <Typography variant='caption'>Appointment Queue List</Typography>          
        </form>
         Current Encounters        
        <ResourceTable resourceType='Encounter' columns={columns}></ResourceTable>
        <Dialog fullWidth maxWidth={'lg'} open={showregister} onClose={()=>setshowregister(false)}>
            <DialogTitle>Direct Register</DialogTitle>
            <DialogContent>
                  <OpdRegister />
            </DialogContent>
        </Dialog>
    </div>
  );
}

export default OpdHome;
