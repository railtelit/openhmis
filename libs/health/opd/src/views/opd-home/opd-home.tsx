import { NameField, ResourceTable } from '@ha/appfhir';
import { Pagetitle } from '@ha/shared-ui';
import { Button, Grid, Table, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './opd-home.module.scss';

/* eslint-disable-next-line */
export interface OpdHomeProps {}



export function OpdHome(props: OpdHomeProps) {
  const columns:GridColDef[]=[ NameField({width:100}) ,{headerName:'Entry Date',field:'end'} , { field:'vitalaction', headerName:'Vital'},{ field:'rx', headerName:'Rx'} ]
  return (
    <div className={styles['container']}>
        <Grid container justifyContent={'space-between'}>
              <Grid item slot={'start'}  > <Pagetitle title='OPD Desk'/> </Grid>
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
