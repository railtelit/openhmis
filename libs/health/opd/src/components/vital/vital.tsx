import styles from './vital.module.scss';

import { Pagetitle, VitalSign } from '@ha/shared-ui';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Container, Grid, Input, Stack, Tab, TextField, Typography ,Paper} from '@mui/material';

import { Component, useState } from 'react';
import PatientCare from '../../components/patient-care/patient-care';


/* eslint-disable-next-line */
export interface VitalProps {}

export function Vital(props: VitalProps) {

  const [tabIndex, setTabindex] = useState('0')
  function handleTabChange(e: any, newValue: string) {
    //
    setTabindex(newValue)
  }
  return (
    <div className={styles['container']}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Paper  style={{height:"50px"}}><i>Neuro:Lethargic<br></br>Paralyse</i></Paper>

        </Grid>
        <Grid item xs={6}>
        <Paper  style={{height:"50px"}}><i>Diabetic</i></Paper>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabIndex} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
            <TabList sx={{ alignItems: 'flex-start', alignContent: 'start', '* button': { alignItems: 'start' } }} centered={false} orientation='horizontal' aria-label="Tab Test " scrollButtons={true} onChange={handleTabChange} variant={'scrollable'} >
              <Tab style={{fontWeight:"900",fontSize:"20px"}} label="Patient Care" value="0" />
              <Tab style={{marginLeft:"50px",fontSize:"20px"}} label="Timeline" value="1" />
              <Tab style={{marginLeft:"50px",fontSize:"20px"}} label="Medications" value="2" />
              <Tab style={{marginLeft:"50px",fontSize:"20px"}}  label="Charting" value="3" />
              <Tab style={{marginLeft:"50px",fontSize:"20px"}}  label="Manage" value="3.1" />


            </TabList>
            <TabPanel value="0">
                <PatientCare/>
            </TabPanel>
            <TabPanel value="1" sx={{flexGrow:1}}>

            </TabPanel>
            <TabPanel value="2" sx={{flexGrow:1}}>

            </TabPanel>
            <TabPanel value="3" sx={{flexGrow:1}}>

            </TabPanel>
            <TabPanel value="3.1" sx={{flexGrow:1}}>

            </TabPanel>


          </Box>
        </TabContext>


      </Box>
    </div>
  );
}

export default Vital;
