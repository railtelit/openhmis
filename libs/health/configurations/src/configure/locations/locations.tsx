import { useFhirQuery } from '@ha/appfhir';

import { Button, Grid, Icon, IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EditLocation from './edit-location/edit-location';
import styles from './locations.module.scss';

/* eslint-disable-next-line */
export interface LocationsProps {}
type Mode = 'create'|'edit'|'list'; 

export function ConfigureLocations(props: LocationsProps) {
  const [locations,locerrors,queryLocations,deleteLocation]=useFhirQuery('Location'); 
  const [mode,setMode]=useState<Mode>('list'); 
  const [record,setRecord]=useState<any>(null)
  useEffect(()=>{
      queryLocations();
  },[])
  function startEdit(mode:Mode,res?:any){
      setMode(mode);  
      res && setRecord(res); 
  }
  return (
    <div className={styles['container']}>
        
          {mode==='list'? 
          <Grid container alignContent={'center'} spacing={2} alignItems={'center'} >
                 <Grid xs={12} md item>
                       <TextField placeholder='Type to Search...' fullWidth variant='filled'/>
                 </Grid>
                 <Grid  xs={12} md={2} alignContent={'stretch'} alignSelf={'center'} alignItems={'stretch'} justifyContent={'stretch'} item>
                     <Button onClick={()=>startEdit('create')} fullWidth variant='outlined'  >CREATE</Button>
                 </Grid>
              <Grid alignItems={'center'}  item xs={12}>
                    {locations.length===0?'No Records Yet..':null}
                    <List>
                          {locations.map(l=> <ListItem> <Typography>Location : {l?.name}</Typography>
                              <IconButton onClick={()=>deleteLocation(l?.id)}><Icon>delete</Icon> </IconButton>
                            </ListItem>)}
                    </List>
              </Grid>
           </Grid>    
          : <EditLocation onCancel={()=>setMode('list')} mode={mode}/>
        }
    </div>

  );
}

export default ConfigureLocations;
