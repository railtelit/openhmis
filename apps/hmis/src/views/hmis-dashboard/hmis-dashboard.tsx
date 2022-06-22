import styles from './hmis-dashboard.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, Grid, Container } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCards from '../dashboard-cards/dashboard-cards'
import DashboardCharts from '../dashboard-charts/dashboard-charts'


/* eslint-disable-next-line */
export interface HmisDashboardProps {}

export function HmisDashboard(props: HmisDashboardProps) {
  return (

    <Container >
      <Grid container spacing={2}>

        <Grid item xs={12}  sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/patient.ico')" text_heading='Registered Patients' text_total='49' total_count='Total Patient : 58' text_sub='Today: 10' color='white' color_bg='rgb(30, 136, 229)'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/doctor.ico')" text_heading='Total Doctors' text_total='25' total_count='Consultants: 18' text_sub='Medical Officers: 0' color='white' color_bg='rgb(255, 88, 88)'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/appointment.ico')" text_heading='Total Appointments' text_total='39' total_count='Completed: 15' text_sub='Pending: 10' color='white' color_bg='rgb(183, 172, 238)'/>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
            <DashboardCharts/>
        </Grid>
      </Grid>



    </Container>
  );
}

export default HmisDashboard;
