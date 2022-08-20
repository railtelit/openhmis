import { ActionButton } from '@ha/shared-ui';
import { Button, Grid, Icon, IconButton, Slider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './temperature-entry.module.scss';

/* eslint-disable-next-line */
export interface TemperatureEntryProps {
     defaultValue?:number
}

export function TemperatureEntry(props: TemperatureEntryProps) {
  const [value,setValue]=useState<number>(props.defaultValue||90); 

 


  return (
    <div className={styles['container']}>
       <Grid container alignItems={'center'} >
          <Grid item md={1} >
              <Stack>
                <IconButton onClick={()=>setValue(v=>v+1)} ><Icon>add</Icon></IconButton>
                <IconButton onClick={()=>setValue(v=>v-1)}><Icon>remove</Icon></IconButton>
              </Stack>
          </Grid>
          <Grid item md={10}>
              <Slider size='small' sx={{color:'red'}} min={40} max={120} valueLabelDisplay='on'  value={value}  onChange={(e,v)=>setValue(v as number)}  /> 
          </Grid>
          <Grid item md={1} textAlign={'center'} >
              <Typography  variant='h1' >
                  {value} 
              </Typography>
          </Grid>
          <Grid item container  justifyContent={'end'} >
              <ActionButton label={'APPLY'}   />
          </Grid>
       </Grid>
    </div>
  );
}

export default TemperatureEntry;
