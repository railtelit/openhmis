import { Pagetitle } from '@ha/shared-ui';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Grid, Input, Tab, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './opd-rx.module.scss';

/* eslint-disable-next-line */
export interface OpdRxProps {}

export function OpdRx(props: OpdRxProps) {
  const [tabIndex,setTabindex] = useState('1')
  function handleTabChange(e:any,newValue:string){
      // 
        setTabindex(newValue)
  }
  return (
    <div className={styles['container']}>
        
      <Grid container alignItems={'center'} columnSpacing={2} >      
            <Grid item alignItems={'center'} >
              <Avatar   />
            </Grid>
            <Grid item>
              <Pagetitle  title='Patient 1'/>
              <Typography variant={'subtitle2'}>Age:31</Typography>
            </Grid>
        </Grid>      
<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList  aria-label="Tab Test " onChange={handleTabChange} >
            <Tab label="Complaints" value="1" />
            <Tab label="Examination" value="2" />
            <Tab label="History" value="3" />
            <Tab label="Chronic IllNess" value="4" />
            <Tab label="Diagnosis" value="5" />
            <Tab label="Investigations" value="6" />
            <Tab label="Medication/Treatment" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>

        <TextField label={'Clinical Note'}   multiline={true} rows={3} fullWidth />
    </Box>
            
    </div>
  );
}

export default OpdRx;
