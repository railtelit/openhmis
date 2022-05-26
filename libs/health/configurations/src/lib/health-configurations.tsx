import { useFhirConverter, useFhirCreate, useSNOMEDQuery } from '@ha/appfhir';
import { Breadcrumbs, Button, Icon, Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import ConfigureLocations from '../configure/locations/locations';
import ConfigurationsHome from './configurations-home/configurations-home';
import styles from './health-configurations.module.scss';

/* eslint-disable-next-line */
export interface HealthConfigurationsProps {}

export function HealthConfigurations(props: HealthConfigurationsProps) {
  const locations=useLocation(); 
  const {convertToForm,convertToResource}=useFhirConverter('Appointment')
  const [createappt,cerror,createAppt]=useFhirCreate('Appointment');
  const {snomedresults,searchDescriptions}=useSNOMEDQuery()
  function test(){ 
        // 
        const appt= { status :'booked',priority:0,start:dayjs().toISOString(),description:'Test',end:dayjs().toISOString(),
                    patient:'Patient/113' }; 
        console.log(appt, convertToResource(appt));
        ///createAppt(convertToResource(appt)).then(console.log)
  }
  function searchtest(term:string){
        //
         searchDescriptions({term})
  }
  return (
    <div className={styles['container']}>      
      <Breadcrumbs sx={{alignItems:'center'}}>
          <Link    to={''}  style={{alignItems:'center',display:'flex',textDecoration:'none',color:'black',}}>
              <Icon>settings</Icon> Configure
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
       {/* <Button  onClick={()=>test()} >Check Appointment</Button> */}
       <TextField fullWidth onChange={(t)=>searchtest(t.target.value)}/>
       <hr />
       {JSON.stringify(snomedresults)}
    </div>
  );
}

export default HealthConfigurations;
