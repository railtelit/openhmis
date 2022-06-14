import styles from './hmis-dashboard.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, Grid, Container } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCards from '../dashboard-cards/dashboard-cards'
import DashboardCharts from '../dashboard-charts/dashboard-charts'
// import FeatherIcon from 'feather-icons-react';

/* eslint-disable-next-line */
export interface HmisDashboardProps {}

export function HmisDashboard(props: HmisDashboardProps) {
  return (

    <Container >
      <Grid container  spacing={2}>

        <Grid item xs={12}  sm={4} lg={4}>

            <DashboardCards icon='AirlineSeatIndividualSuite' text_heading='Registered Patients' text_total='49' text_sub='Out of 150' total_count='50'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards icon='favorite' text_heading='Total Doctors' text_total='25' text_sub='Out of 46' total_count='50'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards icon='favorite' text_heading='Total Appointments' text_total='favorite' text_sub='80' total_count='50'/>
        </Grid>
      </Grid>

      <DashboardCharts/>

    </Container>
  );
}

export default HmisDashboard;
