import { useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Alert, AppBar, Autocomplete, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, Icon, IconButton, InputLabel, Radio, RadioGroup, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EditOrganization from '../components/edit-organization/edit-organization';
import styles from './health-organizations.module.scss';
import {arrayToTree} from 'performant-array-to-tree'
import { RenderTree, RichObjectTree } from '@ha/shared-ui';
import { ConfigureHealthservices } from '@ha/health/configurations';
/* eslint-disable-next-line */
export interface HealthOrganizationsProps {}

export function HealthOrganizations(props: HealthOrganizationsProps) {
  const [showedit,setShowEdit]=useState<boolean>(false)
  const [orgs,fetcherror,queryOrgs,deleteorg,createOrg ]=useFhirQuery('Organization'); 
  const [orgtype,setOrgtype]=useState('prov');
  const [partOf,setPartof]=useState<any|null>(null);

  const [treedata,setTreedata]=useState<any[]>([])
  const [resolve]=useFhirResolver('Organization')
  const [mode,setMode]=useState<string>('create')
  const [record,setRecord]=useState<any>(null); 
  const [currentOrg,setcurrentOrg]=useState<any|null>(null)
  useEffect(()=>{
      queryOrgs();
  },[]); 
  useEffect(()=>{
       const  treelist =  (orgs.map(o=> ({...o,parentId:(o.partOf? o.partOf?.reference.split('/')[1] : null ) }) )); 
       setTreedata( arrayToTree(treelist,{dataField:null, }) ); 
  },[orgs]);
  function startEdit(mode:string,res:any,orgtype='prov'){
      setRecord(res);
      setMode(mode);
      if(orgtype==='dept' && mode==='create'){
        setPartof({reference:`Organization/${currentOrg?.id}`}); 
      }
      if(orgtype==='prov'){
          setPartof(null);
      }
      setOrgtype(orgtype);
      setShowEdit(true);
  }
  function selectOrg(id:string){
       setcurrentOrg(orgs.find(i=>i.id===id));
  }
  return (
    <div className={styles['container']}  >
           <Grid container alignItems={'center'} justifyContent='space-between' >
             <Grid item  xs md >
              <Stack direction={'row'}  alignItems={'center'}  >
                     <Icon>corporate_fare</Icon>
                     <Typography marginLeft={1} alignItems={'center'} variant={'h5'}> Health Organizations</Typography>
              </Stack>
             </Grid>
              <Grid item xs={12} md justifyContent={'flex-end'} alignItems={'end'}    >                      
                      {resolve('type.0.coding.0.code',currentOrg)!=='dept'? <Button onClick={()=>startEdit('create',null,'dept' )}>ADD DEPARTMENT</Button> :null }
                      <IconButton color={'info'} onClick={()=>startEdit('create',null)} ><Icon>add</Icon></IconButton>
                      {currentOrg? <IconButton onClick={()=>startEdit('edit',currentOrg,resolve('type.0.coding.0.code',currentOrg) )}><Icon>edit</Icon> </IconButton>:null }
                      {currentOrg  ? <IconButton color='error' onClick={()=>deleteorg(currentOrg.id)}><Icon>delete</Icon></IconButton>:null }
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
            {/* {(orgs as any[]).map( (o,i)=>
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
            )} */}
            <Grid item md={6}>
              
                <RichObjectTree onNodeSelect={(id)=>selectOrg(id) }
                    displayLabel={(row)=>
                    <Typography sx={{fontWeight:row?.parentId?'':'bolder',p:0}} >
                        {row.name} ({resolve('type.0.coding.0.code',row)||'prov' }) </Typography> } data={treedata} />
            </Grid>
            <Grid item md>
                      <ConfigureHealthservices/>
            </Grid>               
            </Grid>
          
          </Container>
      <Dialog open={showedit} fullWidth  >
       {/* <DialogTitle>
          <Toolbar>ORG</Toolbar>
       </DialogTitle> */}
       <DialogContent>
          <EditOrganization record={record} mode={mode} orgtype={orgtype} partOf={partOf} 
              onUpdate={(updated)=>queryOrgs()} onCreate={(res)=>{
              setShowEdit(false);queryOrgs();
          }} onClose={()=>setShowEdit(false)} start={showedit}/>
       </DialogContent>

      </Dialog>
    </div>
  );
}

export default HealthOrganizations;
