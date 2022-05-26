import { Button, Container, Grid, Icon, IconButton, Paper, Stack, Table, TextField } from '@mui/material';
import { Box } from '@mui/system';
import AppointmentsEdit from '../../components/appointments-edit/appointments-edit';
import AppointmentsList from '../../components/appointments-list/appointments-list';
import HealthCalendar from '../../components/health-calendar/health-calendar';
import styles from './Appointments-home.module.scss';
import {BehaviorSubject, Subject} from 'rxjs'
import { useEffect, useState } from 'react';
import {debounceTime,tap,distinctUntilChanged} from 'rxjs/operators'
import { useFhirQuery } from '@ha/appfhir';

/* eslint-disable-next-line */
export interface AppointmentsHomeProps {}

 type MODE=('edit'|'list'|'create')
 const searchSubject = new Subject<string>();

export function AppointmentsHome(props: AppointmentsHomeProps) {

  const [mode,setMode]=useState<MODE>('list');
  const [limit,setLimit]=useState<number>(10);
  const [heading,setHeading]=useState('Appointments')
  const [record,setRecord]=useState<any>();
  const [search,setSearch]=useState<any>('');
  const [appointments,errors,queryAppointments,deleteAppointment] = useFhirQuery('Appointment',{_count:limit});

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
      queryAppointments({name:val})
  }});
  queryAppointments();
    return ()=>
      {
        sub.unsubscribe();
      }
  },[])
  useEffect(()=>{
    setHeading(mode==='list'?'Appointments':'Edit Appointment:#'+(record?.id));
    if(mode==='create'){
         setHeading('Create New Appointment');
    }
  },[mode])

  return (
    <div className={styles['container']}>

               <Stack alignContent={'center'} spacing={1} direction={'row'} flex={'1'} >
                  <Icon>event</Icon>
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
             { mode==='list'? <Button variant='outlined' endIcon={<Icon>add</Icon>} onClick={startCreate} >New Appointment</Button>
                 : <IconButton onClick={toggleMode} ><Icon>list</Icon></IconButton>
             }
            </Grid>

            <Grid item margin={'auto'}>
              <Button variant='outlined'><Icon>event</Icon></Button>
            </Grid>

        </Grid>
          : <Box/>
        }
        <Box component={Paper} sx={{padding:2}}>
          {mode==='list'?
          <AppointmentsList rows={appointments}  onDeleteRow={(i)=> deleteAppointment(i) }
            onEditRow={(row)=>{
               startEdit(row);
          }} query={{name:search}} />:<AppointmentsEdit mode={mode}

            onCreate={(r)=>{
                setMode('list');queryAppointments();
            }}
           record={record} onClose={()=> { setMode('list');queryAppointments(); }  }/>}
        </Box>
    </div>
  );
}

export default AppointmentsHome;
