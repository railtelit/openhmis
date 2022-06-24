import { useFhirQuery } from '@ha/appfhir';

import { Button, Container, Grid, Icon, IconButton, List, ListItem, ListItemButton, TextField, Typography } from '@mui/material';
import { Location } from 'fhir/r4';
import { useEffect, useState } from 'react';
import EditLocation from './edit-location/edit-location';
import styles from './locations.module.scss';

/* eslint-disable-next-line */
export interface LocationsProps {}
type Mode = 'create'|'edit'|'list'; 

export function ConfigureLocations(props: LocationsProps) {
  const [locations,locerrors,queryLocations,deleteLocation]=useFhirQuery<Location>('Location'); 
  const [mode,setMode]=useState<Mode>('list'); 
  const [record,setRecord]=useState<any>(null)
  useEffect(()=>{
      queryLocations();
  },[])
  function startEdit(mode:Mode,res?:any){
    res && setRecord(res); 
    setMode(mode);  
  }
  return (
    <div className={styles['container']}>
      <Container>
        {mode === 'list' ?
          <Grid container alignContent={'center'} spacing={2} alignItems={'center'} >
            <Grid xs={12} md item>
              <TextField placeholder='Type to Search...' fullWidth variant='filled' />
            </Grid>
            <Grid xs={12} md={2} alignContent={'stretch'} alignSelf={'center'} alignItems={'stretch'} justifyContent={'stretch'} item>
              <Button onClick={() => startEdit('create')} endIcon={<Icon>add</Icon>} fullWidth variant='outlined'  >CREATE</Button>
            </Grid>
            <Grid  item xs={12}>
              {locations.length === 0 ? 'No Records Yet..' : null}
              <List>
                {locations.map(l => 
                <ListItem key={l.id}>
                  <ListItemButton>
                    <Typography>Location : {l?.name}</Typography>
                    <IconButton color={'error'} onClick={() => deleteLocation(l?.id)}><Icon>delete</Icon> </IconButton>
                    <IconButton onClick={() => startEdit('edit', l)}><Icon>edit</Icon> </IconButton>
                  </ListItemButton>
                </ListItem>)}
              </List>
            </Grid>
          </Grid>
          : <EditLocation record={record} onCreate={(res: any) => {
            startEdit('edit', res)
          }} onCancel={() =>{ setMode('list') ; queryLocations(); }
           } mode={mode} />
        }
      </Container>
    </div>

  );
}

export default ConfigureLocations;
