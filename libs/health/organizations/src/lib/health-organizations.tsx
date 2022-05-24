import { useFhirQuery } from '@ha/appfhir';
import { Alert, AppBar, Autocomplete, Button, ButtonGroup, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, Icon, InputLabel, Radio, RadioGroup, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EditOrganization from '../components/edit-organization/edit-organization';
import styles from './health-organizations.module.scss';

/* eslint-disable-next-line */
export interface HealthOrganizationsProps {}

export function HealthOrganizations(props: HealthOrganizationsProps) {
  const [create,setCreate]=useState<boolean>(false)
  const [orgs,fetcherror,queryOrgs,deleteorg,createOrg ]=useFhirQuery('Organization')
  const {setValue,setFocus,control,formState,getValues}=useForm({})
  useEffect(()=>{
      queryOrgs();
  },[])
 
  return (
    <div className={styles['container']}  >
      Create : {create?'T':'F'}
           <Grid container alignItems={'center'} > 
             <Grid item  xs > 
              <Stack direction={'row'}  alignItems={'center'}  >                                         
                     <Icon>corporate_fare</Icon>
                     <Typography marginLeft={1} alignItems={'center'} variant={'h5'}> Health Organizations</Typography>
              </Stack>
             </Grid>
              <Grid item xs={2}>
                  <ButtonGroup>
                      <Button variant='outlined' onClick={()=>setCreate(true)} startIcon={<Icon>create</Icon>}>CREATE NEW</Button>
                  </ButtonGroup>
              </Grid>
           </Grid>  
            
            <Alert title='Alert' icon={<Icon>info</Icon>} severity='info'  >No Definitions Yet..</Alert>
            <Grid container  sx={{height:200,}}  alignItems={'center'} justifyContent={'center'}>
                      <Icon>info</Icon> <Typography  variant={'subtitle1'} >No Records</Typography>
            </Grid>
            {(orgs as any[]).map( (o,i)=> <Card key={i} >
                        Name : {o?.name}
                  </Card> 
            )}
      <Dialog open={create} fullWidth  >
       {/* <DialogTitle>       
          <Toolbar>ORG</Toolbar>       
       </DialogTitle> */}
       <DialogContent>
          <EditOrganization onClose={()=>setCreate(false)} start={create}/>
       </DialogContent>
                
      </Dialog>
    </div>
  );
}

export default HealthOrganizations;
