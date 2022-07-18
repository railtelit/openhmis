import styles from './hmis-dashboard.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, Grid, Container, Button, Modal, ButtonGroup, TextField } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCards from '../dashboard-cards/dashboard-cards'
import DashboardCharts from '../dashboard-charts/dashboard-charts'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Pharmacy from '../pharmacy/pharmacy'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface HmisDashboardProps {}

export function HmisDashboard(props: HmisDashboardProps) {

  const [showLogin, setShowLogin] = useState(false);

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


        <Grid item xs={12} sm={4} lg={4}>

          <Button onClick={() => setShowLogin(true)}>Open Modal</Button>

          <Pharmacy/>

        </Grid>

      </Grid>

    </Container>
  );
}

export default HmisDashboard;
