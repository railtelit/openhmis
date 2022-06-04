import { useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Alert, AppBar, Autocomplete, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, InputLabel, Radio, RadioGroup, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EditOrganization from '../components/edit-organization/edit-organization';
import styles from './health-organizations.module.scss';

/* eslint-disable-next-line */
export interface HealthOrganizationsProps {}

export function HealthOrganizations(props: HealthOrganizationsProps) {
  const [showedit,setShowEdit]=useState<boolean>(false)
  const [orgs,fetcherror,queryOrgs,deleteorg,createOrg ]=useFhirQuery('Organization')
  const [resolve]=useFhirResolver('Organization')
  const [mode,setMode]=useState<string>('create')
  const [record,setRecord]=useState<any>(null)
  useEffect(()=>{
      queryOrgs();
  },[])
  function startEdit(mode:string,res:any){
      setRecord(res);
      setMode(mode);
      setShowEdit(true)
  }
  return (
    <div className={styles['container']}  >
           <Grid container alignItems={'center'} >
             <Grid item  xs >
              <Stack direction={'row'}  alignItems={'center'}  >
                     <Icon>corporate_fare</Icon>
                     <Typography marginLeft={1} alignItems={'center'} variant={'h5'}> Health Organizations</Typography>
              </Stack>
             </Grid>
              <Grid item xs={2}>
                  <ButtonGroup>
                      <Button variant='outlined' onClick={()=>startEdit('create',null)} startIcon={<Icon>create</Icon>}>CREATE NEW</Button>
                  </ButtonGroup>
              </Grid>
           </Grid>

            { orgs.length==0?
                    <div><Alert title='Alert' icon={<Icon>info</Icon>} severity='info'  >No Definitions Yet..</Alert>
                    <Grid container  sx={{height:200,}}  alignItems={'center'} justifyContent={'center'}>
                              <Icon>info</Icon> <Typography  variant={'subtitle1'} >No Records</Typography>
                    </Grid></div>
            : null
            }
            <Container fixed sx={{padding:10}}>


            <Grid container spacing={2}>
            {(orgs as any[]).map( (o,i)=>
                        <Grid key={i} item md={3} xs={12} justifyContent={'center'}>
                        <Card key={i} elevation={3} sx={{maxWidth:250}} >

                          <CardHeader   title={o.name} subheader={ (o.alias||['-']).join(',') } ></CardHeader>
                          <CardContent  >
                                  <Typography variant='body1'> {o.status} </Typography>
                                 {resolve('telecom.0.value',o)}

                          </CardContent>
                          <Divider/>
                          <CardActions>
                              <IconButton color='primary' onClick={()=>startEdit('edit',o)} > <Icon>edit</Icon> </IconButton>
                              <IconButton color='error' onClick={()=>deleteorg(o?.id)} > <Icon>delete</Icon> </IconButton>
                          </CardActions>
                  </Card>
                  </Grid>
            )}
            </Grid>
          </Container>
      <Dialog open={showedit} fullWidth  >
       {/* <DialogTitle>
          <Toolbar>ORG</Toolbar>
       </DialogTitle> */}
       <DialogContent>
          <EditOrganization record={record} mode={mode} onUpdate={(updated)=>queryOrgs()} onCreate={(res)=>{
              setShowEdit(false);queryOrgs();
          }} onClose={()=>setShowEdit(false)} start={showedit}/>
       </DialogContent>

      </Dialog>
    </div>
  );
}

export default HealthOrganizations;
