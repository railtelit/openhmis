import { Breadcrumbs, Icon, Stack, Typography } from '@mui/material';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import ConfigureLocations from '../configure/locations/locations';
import ConfigurationsHome from './configurations-home/configurations-home';
import styles from './health-configurations.module.scss';

/* eslint-disable-next-line */
export interface HealthConfigurationsProps {}

export function HealthConfigurations(props: HealthConfigurationsProps) {
  const locations=useLocation()
  return (
    <div className={styles['container']}>      
      <Breadcrumbs sx={{alignItems:'center'}}>
          <Link    to={''}  style={{alignItems:'center',display:'flex',textDecoration:'none',color:'black',}}>
              <Icon>settings</Icon> Configuration
          </Link>
          {locations.pathname!=='/configure' ? <Typography> {locations.pathname.split('/')[2].toUpperCase() } </Typography> : null }
      </Breadcrumbs>
      {/* <Stack direction={'row'} spacing={1} alignItems={'center'}>
             <Icon>settings</Icon> <Typography variant='h5'>Configurations</Typography>
      </Stack> */}
      <Routes>
          <Route path='' element={<ConfigurationsHome/>} />
          <Route path='/locations' element={<ConfigureLocations/>} />
      </Routes>
       {/* <Outlet/> */}
    </div>
  );
}

export default HealthConfigurations;
