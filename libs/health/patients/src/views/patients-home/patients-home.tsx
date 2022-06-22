import { Button, Container, Grid, Icon, IconButton, Paper, Stack, Table, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import PatientsEdit from '../../components/patients-edit/patients-edit';
import PatientsList from '../../components/patients-list/patients-list';
import styles from './patients-home.module.scss';
import { Subject} from 'rxjs'
import {debounceTime,tap,distinctUntilChanged} from 'rxjs/operators'
import { useFhirQuery } from '@ha/appfhir';
/* eslint-disable-next-line */
export interface PatientsHomeProps {}

 type MODE=('edit'|'list'|'create')
 const searchSubject = new Subject<string>();

export function PatientsHome(props: PatientsHomeProps) {
  const [mode,setMode]=useState<MODE>('list');
  const [limit,setLimit]=useState<number>(10);
  const [heading,setHeading]=useState('Patients')
  const [record,setRecord]=useState<any>();
  const [search,setSearch]=useState<any>('');
  const [patients,errors,queryPatients,deletePatient] = useFhirQuery('Patient',{name:search,_count:limit});

  function toggleMode(){
         setMode(mode==='list'?'edit':'list');
  }
  function startEdit(r:any){
      setRecord(r);
      setMode(m=>'edit');
  }
  function startCreate(){
       setRecord(null);
       setMode('create');
  }

  useEffect(()=>{
       const  sub = searchSubject.asObservable().pipe(
       distinctUntilChanged(),
       debounceTime(900)
  ).subscribe({next:(val)=>{
       setSearch(val);
       queryPatients({name:val})
  }});
  queryPatients();
     return ()=>
       {
         sub.unsubscribe();
       }
  },[])
  useEffect(()=>{
       setHeading(mode==='list'?'Patients':'Edit Patient:#'+(record?.id));
       if(mode==='create'){
            setHeading('Create New Patient');
       }
  },[mode])

  return (
    <div className={styles['container']}>

               <Stack alignContent={'center'} spacing={1} direction={'row'} flex={'1'} >
                  <Icon>people</Icon>
                  <h3>{heading}</h3>
               </Stack>

        {mode==='list' ?
        <Grid container spacing={{sm:2}}
          justifyContent='flex-start' border={0} sx={{padding:1}} >
            <Grid item md={8}>
              <TextField onChange={ (v)=>{
                      //setSearch(v.target.value)
                      searchSubject.next(v.target.value)
                 } } fullWidth  placeholder='Type to Search...' ></TextField>
            </Grid>
            <Grid item margin={'auto'}>
             { mode==='list'? <Button variant='outlined' endIcon={<Icon>add</Icon>} onClick={startCreate} >New Patient</Button>
                 : <IconButton onClick={toggleMode} ><Icon>list</Icon></IconButton>
             }
            </Grid>
        </Grid>
          : <Box/>
        }
        <Box component={Paper} sx={{padding:2}}>
          {mode==='list'?
          <PatientsList   rows={patients}  onDeleteRow={(i)=> deletePatient(i) }
            onEditRow={(row)=>{
               startEdit(row);
          }} query={{name:search}} />:<PatientsEdit mode={mode}

            onCreate={(r)=>{
                setMode('list');queryPatients();
            }}
           record={record} onClose={()=> { setMode('list');queryPatients(); }  }/>}
        </Box>
    </div>
  );
}

export default PatientsHome;
