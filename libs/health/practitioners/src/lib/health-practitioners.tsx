import { BooleanField, NameField, ResourceTable, TelecomField, useFhirQuery } from '@ha/appfhir';
import { ActionButton, Pagetitle } from '@ha/shared-ui';
import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Practitioner } from 'fhir/r4';
import { useEffect, useMemo, useRef, useState } from 'react';
import PractitionerEdit from '../components/practitioner-edit/practitioner-edit';
import styles from './health-practitioners.module.scss';

/* eslint-disable-next-line */
export interface HealthPractitionersProps {}

export function HealthPractitioners(props: HealthPractitionersProps) {
  const columns=[
        NameField({flex:1}),
        TelecomField('phone'),
        TelecomField('email',{headerName:'Email'}),
       BooleanField('active',{headerName:'Status'} ) ] ; 
    const tableRef=useRef()
   const [selectedprac,selectprac]=useState<Practitioner|null>(null);
   const [startedit,setStartedit]=useState(false); 
   const [pracs,pracserror,queryPracs]=useFhirQuery<Practitioner>('Practitioner'); 
   const [newPract,setnewPrac]=useState<Practitioner|null>(null)
   useEffect(()=>{
         queryPracs(); 
   },[]); 
   const table = useMemo(()=>   <ResourceTable refreshRow={newPract}  columns={columns} resourceType='Practitioner' /> , [startedit])
  return (

    <div className={styles['container']}>
      <Paper sx={{p:3}} >    
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Pagetitle icon='account_circle' title='Health Practitioners'/>
            <ActionButton variant='contained' onClick={()=>setStartedit(true)}  label={'Add New'}/>
          </Stack>              
         {table}
      </Paper>
      <Dialog fullWidth maxWidth='lg' open={startedit}>
          <DialogTitle display={'flex'} justifyContent={'space-between'}> 
            <Typography variant={'h4'}>Practitioner</Typography>
            <IconButton onClick={()=>setStartedit(false)}><Icon>close</Icon></IconButton> 
          </DialogTitle>
          <DialogContent>
              <Container sx={{p:2}}>
                  <PractitionerEdit  onCreate={(p)=>{
                      setStartedit(false);queryPracs();; setnewPrac(p)
                  } } />
              </Container>
          </DialogContent>          
      </Dialog>
    </div>
  );
}

export default HealthPractitioners;
