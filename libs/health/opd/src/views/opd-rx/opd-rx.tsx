
import { Clinical } from '@ha/health/appointments';
import { Pagetitle, VitalSign } from '@ha/shared-ui';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Container, Grid, Input, Stack, Tab, TextField, Typography } from '@mui/material';

import { Component, useState } from 'react';
import OpdAllergicForm from '../../components/opd-allergic-form/opd-allergic-form';
import OpdChronicForm from '../../components/opd-chronic-form/opd-chronic-form';
import OpdComplaintForm from '../../components/opd-complaint-form/opd-complaint-form';
import OpdDiagnosisForm from '../../components/opd-diagnosis-form/opd-diagnosis-form';
import OpdHistoryForm from '../../components/opd-history-form/opd-history-form';
import OpdInvestigationsForm from '../../components/opd-investigations-form/opd-investigations-form';
import OpdMedicationForm from '../../components/opd-medication-form/opd-medication-form';
import OpdProceduresForm from '../../components/opd-procedures-form/opd-procedures-form';
import styles from './opd-rx.module.scss';

interface RxTab {
  label: string, icon?: string, component: JSX.Element
}
/* eslint-disable-next-line */
export interface OpdRxProps { }

export function OpdRx(props: OpdRxProps) {
  const TABS: RxTab[] = [{ label: 'Vitals', component: <OpdComplaintForm />, },]
  const [tabIndex, setTabindex] = useState('0')
  function handleTabChange(e: any, newValue: string) {
    // 
    setTabindex(newValue)
  }
  return (
    <div className={styles['container']}>

      <Grid container alignItems={'center'} columnSpacing={2} >
        <Grid item alignItems={'center'} >
          <Avatar />
        </Grid>
        <Grid item md={6}>
          <Pagetitle title='Patient 1' />
          <Typography variant={'subtitle2'}>Age:31</Typography>
        </Grid>
        <Grid item flexGrow={1} flex={1}  justifyContent={'end'} alignContent={'center'} >
           <Stack direction={'row'} flexGrow={1}  flex={1} spacing={2}>
                  <VitalSign icon='favorite'  text='80' />
                  <VitalSign icon='thermostat' text='35dg' />
                  <VitalSign icon='bloodtype' text='AB+' />
                  <VitalSign icon='height' text='170cm' />
                  <VitalSign icon='monitor_weight' text='72Kg' />
                  <VitalSign icon='monitor_heart'  text='170/80' />
           </Stack>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabIndex} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexGrow: 1 }}>
            <TabList sx={{ alignItems: 'flex-start', alignContent: 'start', '* button': { alignItems: 'start' } }} centered={false} orientation='vertical' aria-label="Tab Test " scrollButtons={true} onChange={handleTabChange} variant={'scrollable'} >
              <Tab label="Vitals" value="0" />
              <Tab label="Complaints" value="1" />
              <Tab label="Examination/History" value="2" />
              <Tab label="Chronic Illness" value="3" />
              <Tab label="Allergies" value="3.1" />
              <Tab label="Diagnosis" value="6" />
              <Tab label="Investigations" value="7" />
              <Tab label="Procedures" value="7.1" />
              <Tab label="Medication" value="8" />
            </TabList>
            <TabPanel value="0">
                 <Container>
                   <Clinical/>
                 </Container>
            </TabPanel>
            <TabPanel value="1" sx={{flexGrow:1}}>
              <OpdComplaintForm />
            </TabPanel>
            <TabPanel value="2" sx={{flexGrow:1}}>
              <OpdHistoryForm />
            </TabPanel>
            <TabPanel value="3" sx={{flexGrow:1}}>
                <OpdChronicForm/>
            </TabPanel>
            <TabPanel value="3.1" sx={{flexGrow:1}}>
                <OpdAllergicForm/>
            </TabPanel>
            <TabPanel value="6" sx={{flexGrow:1}}>
                <OpdDiagnosisForm/>
            </TabPanel>
            <TabPanel value="7" sx={{flexGrow:1}}>
                <OpdInvestigationsForm/>
            </TabPanel>
            <TabPanel value="7.1" sx={{flexGrow:1}}>
                <OpdProceduresForm/>
            </TabPanel>
            <TabPanel value="8" sx={{flexGrow:1}}>
                <OpdMedicationForm/>
            </TabPanel>
          </Box>
        </TabContext>

        <TextField label={'Clinical Note'} multiline={true} rows={3} fullWidth />
      </Box>

    </div>
  );
}

export default OpdRx;
