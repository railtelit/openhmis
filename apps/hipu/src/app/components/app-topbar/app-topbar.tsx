import { useKeycloak } from '@ha/authstore';
import { AppBar, Container, Grid, Icon, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import styles from './app-topbar.module.scss';

/* eslint-disable-next-line */
export interface AppTopbarProps {}

export function AppTopbar(props: AppTopbarProps) {
  const kc=useKeycloak();
  return (
      <AppBar>
          <Container maxWidth="xl">

          <Grid container   justifyContent={'space-between'}>
                <Typography  variant='h3'>Open-Arogya</Typography>
                <Stack direction={'row'}>
                    <IconButton onClick={()=>kc?.logout()} color='inherit'><Icon>logout</Icon></IconButton>
                </Stack>
          </Grid>
          </Container>
        
      </AppBar>
     
  );
}

export default AppTopbar;
