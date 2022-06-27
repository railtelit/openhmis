import { ResourceName, useFhirQuery } from '@ha/appfhir';
import { Avatar, Button, Card, CardContent, Container, Grid, Icon, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { Patient, Practitioner } from 'fhir/r4';
import {PatientsEdit} from '@ha/health/patients';
import { useEffect, useState } from 'react';
import styles from './opd-register.module.scss';

/* eslint-disable-next-line */
export interface OpdRegisterProps {}

interface SearchPatientProps{
    onSelectPatient:(p:Patient)=>void
}

function SearchPatient( props:SearchPatientProps ){
    const [creating,setcreating]=useState(false);
    const [searchresults,searcherror,searchpatients]=useFhirQuery<Patient>('Patient')
    const [selected,setSelected]=useState(null); 
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
                      searchresults.map(p=> <PatientCard  actions={<IconButton onClick={()=>selectPatient(p)}><Icon>check</Icon></IconButton>} p={p} /> ) 
                    }
              </Grid>
          </Grid>

    </div>
}
function PatientCard({p,actions }:{p:Patient,actions?:any} ){
    return <Card>
          <CardContent>
              <Grid container>
                  <Grid item md={2}> <Avatar/> </Grid>
                  <Grid item md > 
                        <Stack>
                            <Typography variant='h5' >{p?.name?.[0]?.given }</Typography>
                            <Typography variant='caption' > {p?.telecom?.[0]? p?.telecom?.[0].value : '-'} </Typography>
                        </Stack>
                  </Grid>
                  {actions?actions:null}
              </Grid>
          </CardContent>
    </Card>
}

export function OpdRegister(props: OpdRegisterProps) {
  const [departments]=useFhirQuery('Organization',{});
  const [patient,setPatient]=useState<Patient|null>(null);
  const [pracs,pracserror,loadpractitioners]=useFhirQuery<Practitioner>('Practitioner')
  useEffect(()=>{
        if(patient){
              loadpractitioners();
        }
  },[patient])
  return (
    <div className={styles['container']}>          
<Container>
          <Typography variant='h5' title='' > Patient </Typography>
          {patient?            
              <PatientCard  p={patient}  actions={<IconButton onClick={()=>setPatient(null)} ><Icon>undo</Icon></IconButton>} /> 
              : 
              <SearchPatient onSelectPatient={(p)=>setPatient(p) } /> } 

          {patient? 
              <Stack>
                <Typography variant='h5' title='' > Practitioner : { pracs.length } </Typography>
                <Grid container spacing={1}>
                  
                  {pracs.map(prac=> <Grid item md={3} xs={12}>
                        <Card>
                            <CardContent> <ResourceName {...prac.name} defaultText='' />   </CardContent>
                        </Card>
                  </Grid> )}
                </Grid>
              </Stack>                        
              :null}

          </Container>
    </div>
  );
}

export default OpdRegister;
