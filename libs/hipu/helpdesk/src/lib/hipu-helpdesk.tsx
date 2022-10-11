import styles from './hipu-helpdesk.module.scss';
import { AppBar, Avatar, Box, Container, Grid, Icon, IconButton, Stack, Typography } from '@mui/material'
import { useApiService, useApiState, useAuthState, useReadState } from '@ha/common'
import { ActionButton } from '@ha/shared-ui';
import { Outlet, useRoutes } from 'react-router-dom';
import { HelpdeskRoutes } from './routes';
import { useKeycloak } from '@ha/authstore';
/* eslint-disable-next-line */
export interface HipuHelpdeskProps {}

export function HipuHelpdesk(props: HipuHelpdeskProps) {
  const apiService=useApiService()
  // const hspState=useApiState('roles',{processGroup:'helpdesk'})
  const workerRole = useReadState('workerRole')
  const authState=useAuthState()
  const routes=useRoutes(HelpdeskRoutes)
  const kc=useKeycloak()
  return (
    <div className={styles['']}>
          <AppBar prefix='Open' sx={{boxShadow:10}} >
              <Grid container  p={1} alignItems={'center'} >
                  <Grid item >
                      <Typography variant="h6" > OpenArogya </Typography>
                  </Grid>
                  <Grid item  flexGrow={1} >

                  </Grid>
                  <Grid item display={'flex'} justifyItems={'stretch'} alignItems={'center'} >
                      <Typography variant="caption" >
                      {authState?.userInfo?.preferred_username}
                      </Typography>
                     <Avatar sx={{height:20,width:20,ml:3}}  />
                     {/* <IconButton onClick={()=>kc?.logout()} size='small' color='inherit' ><Icon>logout</Icon></IconButton> */}
                  </Grid>
              </Grid>
          </AppBar>
          
          <Box sx={{mt:10}} >
                {routes}
                <Outlet  />
          </Box>
    </div>
  );
}

export default HipuHelpdesk;
