import { NameField, ResourceTable, SimpleActionField  } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Grid, Table, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import OpdRegister from '../opd-register/opd-register';
import styles from './opd-home.module.scss';

/* eslint-disable-next-line */
export interface OpdHomeProps {}



export function OpdHome(props: OpdHomeProps) {

  const options:any[]=[]; 
  const [showregister,setshowregister]=useState(false);

  const columns:GridColDef[]=[ NameField({flex:1 }),{headerName:'Age',field:'age'},{headerName:'Contact',field:'contact'}
              ,{headerName:'Entry Date',field:'end'} ,  SimpleActionField( {label:'Vital',actionName:'vitalentry',} ) ,
                 SimpleActionField({label:'Rx',actionName:'rx',navigateTo:'rx'})  
            ]
  return (
    <div className={styles['container']}>
        <Grid container justifyContent={'space-between'}>
              <Grid item slot={'start'}  > <Pagetitle icon='medical_services' title='OPD Desk'/> </Grid>
              <Grid item slot={'end'}  > <Button variant={'contained'} onClick={()=>setshowregister(true)}>NEW DIRECT REGISTRATION</Button>  </Grid>
        </Grid>        
        <Typography variant='caption'>Appointment Queue List</Typography>        
        <Box  sx={{width:'8rem',height:'4rem',border:2 , borderRadius:5, boxShadow:20,padding:2}} >
            <div>Patient 1</div>
            <Typography variant={'caption'}>11:00 AM</Typography>
        </Box>
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
