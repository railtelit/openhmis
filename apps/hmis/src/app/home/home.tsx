
import { Box, AppBar, Toolbar, Typography, Drawer, IconButton, Icon, Divider, ListItem, ListItemButton, ListItemText, styled, List, CssBaseline, Grid } from '@mui/material';
import * as  React from 'react';
import {  Navigate, Outlet, Route, Routes, useNavigate,   } from 'react-router-dom';
import { Earnings } from '../../views/dashboards/dashboard1-components';

import { HOME_ROUTES } from './routes';
import { TestReport } from './TestReport';


const HealthPatients = React.lazy( ()=> import('@ha/health/patients') ) ;
const HealthOPD = React.lazy( ()=> import('@ha/health/opd') ) ;
const Practitioners = React.lazy( ()=> import('@ha/health/practitioners') ) ;
const Appointments = React.lazy( ()=> import('@ha/health/appointments') ) ;
const Organizations = React.lazy( ()=> import('@ha/health/organizations') ) ;
const Configurations = React.lazy( ()=> import('@ha/health/configurations') ) ;
/* eslint-disable-next-line */
export interface HomeProps {}
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const WelcomeHome = ()=><div> 
    <Grid container>
    <Grid item md={3}>
        <Earnings/> 
    </Grid>
    <Grid item md={3}>
          <TestReport />
    </Grid>
    </Grid>
  </div>


//{/* {route?.divider ? <Divider  key={`hr${route.path}`} /> :null } */}
export function Home(props: HomeProps) {
const navigate=useNavigate();

 
const RouteItems=HOME_ROUTES.map(route=>
  <ListItem key={route.path}  onClick={()=>navigate(route.path??'') }  color="primary" sx={{ padding: 0, margin: 0, className: 'active' ,  }} >

  <ListItemButton  key={`option${route.path}`} alignItems='center'  sx={{ width: 100, flexGrow: 1 }} >
    <Icon>{route.icon}</Icon>
    <ListItemText style={{marginLeft:5}}>  {route.label}</ListItemText>
  </ListItemButton>
  </ListItem>

 );

  return (
    <Box>      
{/* 
    <AppBar title="HMIS">
      <Toolbar>
        <IconButton>
          <Icon>local_hospital</Icon>
        </IconButton>
        <Typography variant="h6">Open-HMIS</Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
    >
      <DrawerHeader>
        <IconButton>
          <Icon color="primary">local_hospital</Icon>
        </IconButton>
        <Typography sx={{ fontWeight: 'bold' }}>Open-HMIS</Typography>
      </DrawerHeader>
      <Divider />
      <List>
          {RouteItems}
      </List>
    </Drawer>
    <Box sx={{marginLeft:30,marginTop:10 }}> */}    
    <Routes>
           <Route path="/"  element={<Navigate  to={'dashboard'} />}   />
         
           <Route path="/dashboard" element={ <WelcomeHome/> }  />
           <Route path="/health/patients" element={
                 <React.Suspense fallback={<div>Loading Patient....</div>}>
                      <HealthPatients/>  
                 </React.Suspense>} 
              />     
           <Route path="/health/opd/*" element={
                 <React.Suspense fallback={<div>Loading OPD....</div>}>
                     <Routes>
                        <Route   path='/*' element={<HealthOPD/>} />
                     </Routes>
                 </React.Suspense>} 
              />     
           <Route path="/health/practitioners" element={
                 <React.Suspense fallback={<div>Loading Practioners....</div>}>
                      <Practitioners/>
                 </React.Suspense>} 
              />     
           <Route path="/health/appointments/*" element={
                 <React.Suspense fallback={<div>Loading Appointment....</div>}>
                      <Routes>

                        <Route path="/*" element={<Appointments/> } >

                        </Route>
                      </Routes>
                 </React.Suspense>}
              />
           <Route path="/health/organizations" element={
                 <React.Suspense fallback={<div>Loading Organizations....</div>}>

                      <Organizations />
                 </React.Suspense>}
              />
           <Route path="/configure/*" element={
                 <React.Suspense fallback={<div>Loading Settings....</div>}>
                   <Routes>
                          <Route path="/*" element={<Configurations/>}/>
                   </Routes>
                      {/* <Configurations /> */}
                 </React.Suspense>}
              />
    </Routes>

       <Outlet/>

    </Box>
  
  );
}

export default Home;
