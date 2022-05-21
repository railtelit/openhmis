import { Grid, Icon, IconButton, Paper, Table, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import PatientsEdit from '../../components/patients-edit/patients-edit';
import PatientsList from '../../components/patients-list/patients-list';
import styles from './patients-home.module.scss';
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'
/* eslint-disable-next-line */
export interface PatientsHomeProps {}

 type MODE=('edit'|'list'|'create')

export function PatientsHome(props: PatientsHomeProps) {
  const [mode,setMode]=useState<MODE>('list'); 
  const [record,setRecord]=useState(); 
  const [search,setSearch]=useState<string>(''); 
  const searchSubject = new Subject<string>();
  function toggleMode(){
         setMode(mode==='list'?'edit':'list');
  }
  function startEdit(r:any){
      setRecord(r); 
      setMode(m=>'edit');
  }
  useEffect(()=>{
      const subs = searchSubject.pipe(
           debounceTime(900)
      ).subscribe({
        next:(t)=>setSearch(o=>t)
      }); 
     return ()=>
       { 
         console.log("Unsubs");
         subs.unsubscribe(); 
       }
  },[])
  useEffect(()=>{
    //
  },[search])
   
  return (
    <div className={styles['container']}>
        <Grid container spacing={{sm:1}} 
          justifyContent='flex-start' border={0} sx={{padding:1}} >
            <Grid item md={8}>
              <TextField onChange={ (v)=> setSearch(v.target.value)} fullWidth></TextField>
              <label title={search}>Search : {search}</label>
            </Grid>
            <Grid item margin={'auto'}>
             { mode==='list'? <IconButton onClick={toggleMode} ><Icon>add</Icon></IconButton>  
                 : <IconButton onClick={toggleMode} ><Icon>list</Icon></IconButton>
             }
            </Grid>
        </Grid>
        <Box component={Paper} sx={{padding:2}}>          
          {mode==='list'?<PatientsList onEditRow={(row)=>{                
               startEdit(row);
          }} query={{name:search}} />:<PatientsEdit mode={mode} record={record} onClose={()=> setMode('list')}/>}
        </Box>
    </div>
  );
}

export default PatientsHome;
