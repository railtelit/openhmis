import { Button, Grid, Icon, IconButton, Slider, Stack, TextField } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/system';
import styles from './blood-pressure.module.scss';
import dayjsadapter  from '@date-io/dayjs'
import { useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';
/* eslint-disable-next-line */
export interface BloodPressureProps {
      defaultValue?:number[]|null; 
}

export function BloodPressureEntry(props: BloodPressureProps) {
  const [value,setValue]=useState(props.defaultValue||[80,120])
  const [recorddate,setRecorddate]=useState<Date|null>(new Date());
  function add(index=0){
      const val:number[] = [...value];
      val[index]++;
      setValue( val )
  }
  function remove(index=0){
    const val:number[] = [...value];
    val[index]--;
    setValue( val )
  }
  return (
    <div className={styles['container']}>
       Blood Pressure : 
       
        <Grid container  alignItems={'center'} >
          <Grid item md={1} direction={'column'} >
              <Stack>
                <IconButton onClick={()=>add(0)}><Icon>add</Icon></IconButton>
                <IconButton onClick={()=>remove(0)}><Icon>remove</Icon></IconButton>
              </Stack>
          </Grid>
          <Grid item md  >
            <Slider  value={value}  min={50} max={150}   onChange={({target }:any)=> setValue(target?.value||[0])}
                  marks={true} valueLabelDisplay={'on'} />
          </Grid>
          <Grid item md={1} direction={'column'} >
             <Stack>
                <IconButton onClick={()=>add(1)}><Icon>add</Icon></IconButton>
                <IconButton onClick={()=>remove(1)}><Icon>remove</Icon></IconButton>
              </Stack>
          </Grid>
        </Grid>
        Recording Time : 
        <Grid container justifyContent={'center'} rowSpacing={4} >          
          <Grid item justifyContent={'space-between'} container alignItems={'center'}  >
            <LocalizationProvider dateAdapter={dayjsadapter}>
              <DesktopTimePicker               
                orientation="portrait"            
                ampm
                value={recorddate}
                onChange={(newValue:any) => {
                  setRecorddate(newValue);
                }}
                renderInput={(params:any) => <TextField {...params} />}
              />
            </LocalizationProvider>
              <Button variant='contained' color='primary' >APPLY</Button>
          </Grid>
           
        </Grid>
    </div>
  );
}

export default BloodPressureEntry;
