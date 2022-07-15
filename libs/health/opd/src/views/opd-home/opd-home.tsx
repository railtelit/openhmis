import { FhirService, NameField, ReferenceDisplayField, ResourcerefAutocomplete, ResourceTable, SimpleActionField, useFhirQuery  } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Icon, IconButton, Radio, RadioGroup, Table, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Organization } from 'fhir/r4';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import OpdRegister from '../opd-register/opd-register';
import styles from './opd-home.module.scss';
import AppointmentCards from '../../components/appointment-cards/appointment-cards';

/* eslint-disable-next-line */
export interface OpdHomeProps {}



export function OpdHome(props: OpdHomeProps) {

  const options:any[]=[];
  const [showregister,setshowregister]=useState(false);
  const [newEntry,setNewEntry]=useState<any>(null)
  const [depts,deptloaderror,getdepts ]=useFhirQuery<Organization>('Organization',{type:'dept'})
  const encounterForm=useForm({});

  useEffect(()=>{
      // Load Dept Options
      getdepts().then((list:void | Organization[])=>{

          if(  (list as any[]).length===1){
              console.log('Setting Single Vale ')
              list &&  encounterForm.setValue('serviceProvider', FhirService.toReference((list)[0])  )
          }
      });
  },[]);
  function onCreate(formValue:any){
      console.log(formValue)
  }
  function onEncounterCreate(e:any){
        setshowregister(false);
        toast.success('Saved Encounter');
        setNewEntry(e)
  }

  const columns:GridColDef[]=[ ReferenceDisplayField( 'subject', {flex:1 }),
                //{headerName:'Age',field:'age'},{headerName:'Contact',field:'contact'}
                {headerName:'Status',field:'status'} , ReferenceDisplayField('class',),
                SimpleActionField( {label:'Vital',actionName:'vitalentry',} ) ,
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
                          <ResourcerefAutocomplete  label={'Department'} name='serviceProvider' params={{type:'dept'}}
                              getOptionLabel={(r)=>r.name} defaultValue={encounterForm.getValues()['serviceProvider']||null}
                             resourceType='Organization' control={encounterForm.control} />
                        </Grid>
                        <Grid item>
                           {/* <Button type='submit'>Create</Button> */}
                        </Grid>
                </Grid>
          {/* <Typography variant='caption'>Appointment Queue List</Typography> */}

          <Grid container>
            <Grid item md={12}>
               
              <AppointmentCards/>

            </Grid>
          </Grid>


        </form>
         Current Encounters
        <ResourceTable refreshRow={newEntry} resourceType='Encounter' columns={columns}></ResourceTable>
        <Dialog fullWidth maxWidth={'lg'} open={showregister} onClose={()=>setshowregister(false)}>
            <DialogTitle display='flex' justifyContent={'space-between'}>
              <Typography> Direct Registration</Typography>
              <IconButton onClick={()=>setshowregister(false)} ><Icon>close</Icon></IconButton>
            </DialogTitle>
            <DialogContent>
                  <OpdRegister onCreateEncounter={(e)=> onEncounterCreate(e) } serviceProvider={encounterForm.getValues()['serviceProvider']} />
            </DialogContent>
        </Dialog>
    </div>
  );
}

export default OpdHome;
