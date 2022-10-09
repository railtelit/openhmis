import { T } from '@ha/shared-ui';
import { Card, CardContent, CardHeader, Divider, Grid, Icon, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminControlCard from '../../components/admin-control-card/admin-control-card';
import styles from './admin-dashboard.module.scss';

/* eslint-disable-next-line */
export interface AdminDashboardProps {}


const TotalCard=(props:{total:number,title:string,icon?:string,color?:string})=><Card  sx={{boxShadow:5}} >
     <CardContent >
            <Grid container alignItems={'center'} spacing={2} marginBottom={0}  >
              <Grid item md={'auto'} xs={'auto'} > <Icon color='primary' fontSize={'large'} >{props?.icon||'insights'}</Icon> </Grid>
              <Grid item md xs container >
                  <Stack alignItems={'right'} textAlign={'right'} flexGrow={1} >
                      <Typography variant='h2' fontWeight={'bold'} > {props.total} </Typography>
                      <Typography color={ props?.color||'warning'} variant='caption'> {props.title} </Typography>
                  </Stack>
              </Grid>
            </Grid>
     </CardContent>
</Card>

export function AdminDashboard(props: AdminDashboardProps) {
     const nav=useNavigate()
  return (
        <Container>
         <Grid container spacing={1} alignItems={'center'} justifyContent={'space-around'} >
          <T  text='Dashboard' variant='h3'  />
             <Grid item md={3} xs={12} >
                  <TotalCard title={'Health Practitioners'} total={30} />
             </Grid>
             <Grid item md={3}  xs={12}>
                  <TotalCard icon='directions_walk' title={'Total Outpatients'} total={300} />
              </Grid>
             <Grid item md={3} xs={12}>
                  <TotalCard icon='today' title={'Todays'} total={1} />
              </Grid>
         </Grid>

     
          <Grid container spacing={2}>
               <Grid item md={4} xs={12}>
                         <Card> 
                              <Stack direction={'row'}>
                                   <Icon>settings</Icon>
                                   <Typography variant='h6'>Setup</Typography>
                              </Stack>
                              <Divider/>
                              <List>                              
                                   <ListItem >
                                        
                                             <ListItemButton onClick={()=>nav('/admin/setup-org')} >
                                                  <ListItemText primary={'Organisation'} ></ListItemText>
                                             </ListItemButton>
                                         
                                         
                                   </ListItem>
                                   <ListItem>
                                        <ListItemButton onClick={()=>nav('/admin/setup-locations')}>
                                             <ListItemText primary={'Location'} ></ListItemText>
                                        </ListItemButton>
                                   </ListItem>
                              </List>
                         </Card>
               </Grid>
              <Grid item md={4} xs={12}>
                   <AdminControlCard title='HelpDesk Team' managelink='manage-worker' icon='group' roleName='helpdesk' />                   
              </Grid>
              <Grid item md={4} xs={12}>
                   <AdminControlCard title='Practitioners' roleName='doctor'  managelink='manage-practitioner' icon='contacts' />                   
              </Grid>
          </Grid>
          


        </Container>
    
  );
}

export default AdminDashboard;
