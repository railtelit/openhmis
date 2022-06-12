import { NameField, ResourceTable, SimpleActionField  } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Button, Grid, Table, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './opd-home.module.scss';

/* eslint-disable-next-line */
export interface OpdHomeProps {}



export function OpdHome(props: OpdHomeProps) {



  const columns:GridColDef[]=[ NameField({flex:1 }),{headerName:'Age',field:'age'},{headerName:'Contact',field:'contact'}
              ,{headerName:'Entry Date',field:'end'} ,  SimpleActionField( {label:'Vital',actionName:'vitalentry',} ) ,
                 SimpleActionField({label:'Rx',actionName:'rx',navigateTo:'rx'})  
            ]
  return (
    <div className={styles['container']}>
        <Grid container justifyContent={'space-between'}>
              <Grid item slot={'start'}  > <Pagetitle icon='medical_services' title='OPD Desk'/> </Grid>
              <Grid item slot={'end'}  > <Button variant={'contained'}>NEW REGISTRATION</Button>  </Grid>
        </Grid>
        <Typography variant='caption'>Queue List</Typography>
        <Box  sx={{width:'8rem',height:'4rem',border:2 , borderRadius:5, boxShadow:20,padding:2}} >
            <div>Patient 1</div>
            <Typography variant={'caption'}>11:00 AM</Typography>
        </Box>
         Current Encounters        
        <ResourceTable resourceType='Patient' columns={columns}></ResourceTable>
    </div>
  );
}

export default OpdHome;
