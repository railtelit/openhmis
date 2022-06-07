import * as React from 'react';
import { Box, Grid, TextField} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './patient-evaluation.module.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFhirQuery, useFhirResource } from '@ha/appfhir';
import Validation from '../validation/validation';
import Administrative from '../administrative/administrative';
import Clinical from '../clinical/clinical';
import DxProcedures from '../dx-procedures/dx-procedures';
import MainInfo from '../main-info/main-info';
import Mental from '../mental/mental';
import axios from 'axios';
import dayjs from 'dayjs';

const pages = ['Main Info', 'Clinical', 'Mental', 'Dx and Procedures', 'Validation', 'Administrative'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

let gender: any;
let age: number;
let visit: any;
let health_prof: any;
let code: any;

export interface PatientEvaluationProps {
  onClose?:()=>void,
}

export function PatientEvaluation({onClose=()=>{const i = true }}: PatientEvaluationProps) {

  const [value, setValue] = React.useState('1');
  const [allpatients,qerror,loadpatients]= useFhirQuery('Patient',{_id:value})
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const {appointmentId} =useParams();

  useEffect(() => {

    console.log("appointmentId "+appointmentId)

    const loadUsers = async () => {

      const response = await axios.get('http://at.erpapps.in/fhir/Patient?name='+appointmentId);
      const posts = response.data.entry;

      // gender = posts[0].resource.gender;
      // age = getAge(posts[0].resource.birthDate);
      // visit = posts[0].resource.gender;
      // health_prof = posts[0].resource.gender;
      // code = posts[0].resource.gender;
      // console.log(gender)

      // for (var i = 0; i < posts.length; i++){

      //   console.log("newList- "+posts[i].resource.gender)
      //   //newList.push(posts[i].resource.name[0].family)
      // }
    }
    loadUsers();
    loadpatients({name:''});
  }, [])

  function getAge(dateString:any){

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    //console.log(today.getFullYear() +" "+ birthDate.getFullYear())
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

  // const [record,error,loaddata] = useFhirQuery('Patient',{name:appointmentId})
  // useEffect(()=>{
  //       if(loaddata)
  //           loaddata();
  //           console.log("Patient record"+ record);
  // },[])

  return (

    <div className={styles['container']}>

      <Grid container spacing={2} >
        <Grid item md={4}>
          <TextField label='Patient' fullWidth value={appointmentId} disabled />
        </Grid>
        <Grid item md={4}>
        <TextField label='Gender' fullWidth value={gender} disabled />
        </Grid>
        <Grid item md={4}>
          <TextField label='Age' fullWidth value={age} disabled />
        </Grid>

        <Grid item md={4}>
          <TextField label='Visit' fullWidth value="" disabled />
        </Grid>
        <Grid item md={4}>
          <TextField label='Health Prof' fullWidth value="" disabled />
        </Grid>
        <Grid item md={4}>
          <TextField label='Code' fullWidth value="" disabled />
        </Grid>
      </Grid>

      <br/>

      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Main Info" value="1" />
            <Tab label="Clinical" value="2" />
            <Tab label="Mental" value="3" />
            <Tab label="Dx and Procedures" value="4" />
            <Tab label="Validation" value="5" />
            <Tab label="Administrative" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1"><MainInfo/></TabPanel>
        <TabPanel value="2"><Clinical/></TabPanel>
        <TabPanel value="3"><Mental/></TabPanel>
        <TabPanel value="4"><DxProcedures/></TabPanel>
        <TabPanel value="5"><Validation/></TabPanel>
        <TabPanel value="6"><Administrative/></TabPanel>
      </TabContext>
    </Box>
    </div>
  );
};

export default PatientEvaluation;
