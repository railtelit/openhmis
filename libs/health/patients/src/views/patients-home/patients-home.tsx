import { Grid, Icon, IconButton, Paper, Table } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import PatientsEdit from '../../components/patients-edit/patients-edit';
import PatientsList from '../../components/patients-list/patients-list';
import styles from './patients-home.module.scss';

/* eslint-disable-next-line */
export interface PatientsHomeProps {}

 type MODE=('edit'|'list'|'create')

export function PatientsHome(props: PatientsHomeProps) {
  const [mode,setMode]=useState<MODE>('list'); 
  const [record,setRecord]=useState()
  function toggleMode(){
         setMode(mode==='list'?'edit':'list');
  }
  function startEdit(r:any){
      setRecord(r); 
      setMode(m=>'edit');
  }
  return (
    <div className={styles['container']}>
        <Grid container spacing={{sm:1}} justifyContent='flex-start' border={0} sx={{padding:1}} >
             { mode==='list'? <IconButton onClick={toggleMode} ><Icon>edit</Icon></IconButton>  
                 : <IconButton onClick={toggleMode} ><Icon>list</Icon></IconButton>
             }
        </Grid>
        <Box component={Paper} sx={{padding:2}}>          
          {mode==='list'?<PatientsList onEditRow={(row)=>{
             //
               startEdit(row);
          }} />:<PatientsEdit mode={mode} record={record} onClose={()=> setMode('list')}/>}
        </Box>
    </div>
  );
}

export default PatientsHome;
