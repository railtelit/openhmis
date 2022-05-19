import { useFhirCreate, useFhirQuery } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import styles from './patients-list.module.scss';

/* eslint-disable-next-line */
export interface PatientsListProps {}

export function PatientsList(props: PatientsListProps) {
  const [patients,queryerror,makeRequest,deleteResource,createPatient] = useFhirQuery('Patient'); 
  const [newPatient,createerror,createResource ]=useFhirCreate('Patient')
  const cols:GridColDef[]=[ 
            {field:'id',headerName:'Id'},  {field:'name',headerName:'Patient Name',flex:1,
              valueGetter:(v)=> v.row?.fullUrl },
            {field:'gender',headerName:'Gender'},  {field:'status',headerName:'Status'},
            {field:'action', renderCell:(v)=>{
                return <Button onClick={()=>{
                     deleteResource(v.row?.id); 
                }} ><Icon>delete</Icon> </Button>
            } }
      ]; 
  const [rows,setRows]=useState([{ id:1, name:'Test',sex:'Male',status:'Active' }]);
  async function handleCreate(){
      //   createPatient({});  
  }
  useEffect(()=>{
       console.log(patients)
       setRows( patients );
  },[patients]);
  useEffect(()=>{
    if(newPatient){
        console.log(`On New Patient Call `);
          makeRequest();
    }
  },[newPatient])
  
  return (
    <div className={styles['container']}>
      <Button onClick={()=>handleCreate()}> <Icon>add</Icon> </Button>
      <Box sx={{minHeight:300,alignSelf:'stretch',height:500}}>
          <DataGrid rows={rows} columns={cols} pageSize={25}  showCellRightBorder={true}  />               
      </Box>
    </div>
  );
}

export default PatientsList;
