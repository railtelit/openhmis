import { ResourceName, useFhirQuery } from '@ha/appfhir';
import { Avatar, Button, Card, CardContent, Chip, Container, Grid, Icon, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Encounter, Organization, Patient, Practitioner, Reference } from 'fhir/r4';
import {PatientsEdit} from '@ha/health/patients';
import { useEffect, useState } from 'react';
import styles from './opd-register.module.scss';
import { CalendarPicker, DatePicker, LocalizationProvider } from '@mui/lab';
import dayjs from '@date-io/dayjs'
import  Dayjs from 'dayjs'
import { ActionButton } from '@ha/shared-ui';
import { useOPDService } from '../../lib/opd.service';

Dayjs().format('YYYY-MM-DD')

/* eslint-disable-next-line */
export interface OpdRegisterProps {
         serviceProvider?:Reference; 
         onCreateEncounter?:(e:Encounter|null)=>void
}

interface SearchPatientProps{
    onSelectPatient:(p:Patient)=>void
}

function SearchPatient( props:SearchPatientProps ){
    const [creating,setcreating]=useState(false);
    const [searchresults,searcherror,searchpatients]=useFhirQuery<Patient>('Patient')
    const [selected,setSelected]=useState(null); 
    useEffect(()=>{
        searchpatients({}) ;
    },[])
    function selectPatient(p:any){
           setcreating(false); props.onSelectPatient(p);
    }
    function searchPatient(text:string){
            searchpatients({name:text})
    }
    return <div>
          
          <Grid container spacing={1} alignItems='center' >
              <Grid item md={6}>
                  <TextField onChange={(e)=>searchPatient(e.target.value)} fullWidth label='Contact/Name' variant='filled'/>
              </Grid>
              <Grid item md={6} alignItems='center'>
                  {creating? 
                      <Button variant='outlined' fullWidth color='error' onClick={()=>setcreating(false)} >BACK TO SEARCH</Button>
                      : <Button variant='contained' onClick={()=>setcreating(true)} fullWidth color='primary'>ADD NEW PATIENT</Button>
                  }
              </Grid>
              <Grid item md={12}>
                    {creating? <PatientsEdit onCreate={(p)=>selectPatient(p) } onClose={()=>setcreating(false)} mode='create' />: 
                      searchresults.map(p=> <PatientCard key={`P${p.id}` } onClick={()=>selectPatient(p)} actions={<IconButton onClick={()=>selectPatient(p)}><Icon>check</Icon></IconButton>} p={p} /> ) 
                    }
              </Grid>
          </Grid>

    </div>
}
function PatientCard({p,actions,onClick }:{p:Patient,actions?:any,onClick?:()=>void} ){
    return <Card onClick={()=>onClick && onClick()}   >
          <CardContent sx={{p:0,m:0,py:0}}>
              <Grid container>
                  <Grid item md={2}> <Avatar/> </Grid>
                  <Grid item md > 
                        <Stack>
                            <Typography variant='h5' > <ResourceName  defaultText='-' {...(p?.name?.[0]) } /></Typography>
                            <Typography variant='caption' sx={{fontStyle:'italic'}} > Contact: {p?.telecom?.[0].value} </Typography>
                        </Stack>
                  </Grid>
                  {actions?actions:null}
              </Grid>
          </CardContent>
    </Card>
}

function PractitionerCard({prac,action}:{prac:Practitioner,action:any}){
        return  <Card sx={{py:0}}>
        <CardContent  sx={{p:0}}>  
            <Grid container alignItems={'center'}>
                <Grid item md={10}>
                    <ResourceName {...prac.name?.[0]} defaultText='' />   
                </Grid>
                <Grid item md={2}>
                     {action}
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export function OpdRegister(props: OpdRegisterProps) {
  const [departments]=useFhirQuery('Organization',{});
  const [patient,setPatient]=useState<Patient|null>(null);
  const [practselected,setPrac]=useState<Practitioner|null>(null)
  const [pracs,pracserror,loadpractitioners]=useFhirQuery<Practitioner>('Practitioner'); 
  const [encounterdate,setencounterdate]=useState<any>(new Date()); 
  const [selectedslot,setSelectedslot]=useState<string|null>(null); 
  const slots = ['11:00','11:15','11:30'].map(s=> <ToggleButton key={s} value={s} > {s} </ToggleButton> ); 
  const opdService = useOPDService()
  useEffect(()=>{
        if(patient){
              loadpractitioners();
        }
  },[patient]); 

function createEncounter(){
         if(patient && practselected){
              opdService.createNewEncounter({patient,practitioner:practselected,serviceProvider:props.serviceProvider,startTime:selectedslot,
                        date:encounterdate }).then(e=>{
                        if(e)
                         props.onCreateEncounter && props.onCreateEncounter(e)
              })
         }
  }
  
  return (
    <div className={styles['container']}>          
<Container>
         
          <Grid container >
              <Grid item md={12}>
                  <Typography variant='h5' title='' > Patient </Typography>
                  {patient?
                      <PatientCard  p={patient}  actions={<IconButton onClick={()=>setPatient(null)} ><Icon>undo</Icon></IconButton>} />
                      :
                      <SearchPatient onSelectPatient={(p)=>setPatient(p) } /> }
              </Grid>
              <Grid item md={12} >
                  {patient?
                      <Stack >
                        <Typography variant='h5' title='' > Practitioner :  <Chip title='All'  label='All'/> </Typography>
                        <Grid container spacing={1}>
                          {practselected ?
                                <Grid item md={3}  > <PractitionerCard  prac={practselected} action={<IconButton onClick={()=>setPrac(null)} ><Icon>close</Icon></IconButton>}/> </Grid>
                                    :
                                    pracs.map(prac=> <Grid key={prac.id} item  md={3} xs={12}>
                                                        <PractitionerCard  prac={prac}
                                                        action={  <IconButton onClick={()=>setPrac(prac)}><Icon>check</Icon></IconButton>}/>
                                                    </Grid> )
                            }
                        </Grid>
                      </Stack>
                      :null}
              </Grid>              
          </Grid>
              {/* Show Calender */}
              {patient&&practselected ? 
              
            <Grid container alignItems={'center'} spacing={2}>
                <Grid item md={2} justifyContent={'start'} py={2} >
                    
                    <Typography py={2} >Date</Typography>
                    <LocalizationProvider  dateAdapter={dayjs}   >
                        {/* Encounter Date */}
                        <DatePicker    disablePast onChange={(newdate)=> setencounterdate(Dayjs(newdate).format('YYYY-MM-DD') ) }   
                            label='Select' value={encounterdate}
                            renderInput={(params)=> <TextField fullWidth {...params} />}  />
                    </LocalizationProvider>
                </Grid>
                <Grid item py={2} md={10}>
                        <Typography py={2}>Slot</Typography>
                        <ToggleButtonGroup exclusive value={selectedslot||null} onChange={(e,v)=>{
                                setSelectedslot(v)
                        }} >
                                {slots}
                        </ToggleButtonGroup>
                </Grid>
                <Grid item justifyContent={'end'} >
                        <Button variant='contained' onClick={()=> createEncounter() } color='error' >CREATE ENCOUNTER</Button>
                </Grid>
            </Grid>
            : null } 
          </Container>
    </div>
  );
}

export default OpdRegister;
