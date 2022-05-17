
import { Box, AppBar, Toolbar, Typography, Drawer, IconButton, Icon, Divider, ListItem, ListItemButton, ListItemText, styled, List } from '@mui/material';
import * as  React from 'react';
import {  Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { HOME_ROUTES } from './routes';

const HealthPatients = React.lazy( ()=> import('@ha/health/patients') ) ;
const Appointments = React.lazy( ()=> import('@ha/health/appointments') ) ;
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

const WelcomeHome = ()=>
     <div>Welcome </div>


export function Home(props: HomeProps) {
const navigate=useNavigate();

const RouteItems=HOME_ROUTES.map(route=>
  <ListItem key={route.path} onClick={()=>navigate(route.path??'') }  color="primary" sx={{ padding: 0, margin: 0, className: 'active' ,  }} >  
  <ListItemButton sx={{ width: 100, flexGrow: 1 }} >
    <Icon>{route.icon}</Icon>  
    <ListItemText>  {route.label}</ListItemText>
  </ListItemButton>  
  </ListItem> 
 ); 
 
  return (
    <Box>
    <AppBar title="HMIS">
      <Toolbar>
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
    <Box sx={{marginLeft:30,marginTop:10 }}>
    <Routes>
           <Route path="/" element={ <WelcomeHome/> }  /> 
           <Route path="/health/patients" element={
                 <React.Suspense fallback={<div>Loading Patient....</div>}>
                      <HealthPatients/>  
                 </React.Suspense>} 
              />     
           <Route path="/health/appointments" element={
                 <React.Suspense fallback={<div>Loading Appointment....</div>}>
                      <Appointments/>  
                 </React.Suspense>} 
              />     
    </Routes>

       <Outlet/>    
        
    </Box>
  </Box>
  );
}

export default Home;