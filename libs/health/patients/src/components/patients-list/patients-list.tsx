import { useFhirCreate, useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import styles from './patients-list.module.scss';

/* eslint-disable-next-line */
export interface PatientsListProps {
    onEditRow?:(row:any)=>void,
    query?:any
}

export function PatientsList({onEditRow,query}: PatientsListProps) {
  const [patients,queryerror,makeRequest,deleteResource,createPatient] = useFhirQuery('Patient',query); 
  const [newPatient,createerror,createResource ]=useFhirCreate('Patient');
  const [ resolve]=useFhirResolver()
  const cols:GridColDef[]=[ 
            {field:'id',headerName:'Id'},  {field:'name',headerName:'Patient Name',flex:1,
              valueGetter:(v)=> resolve('name.0.family',v.row)  },
              {field:'contact',headerName:'Contact',valueGetter:(v)=> resolve('telecom.0.value',v.row) },
            {field:'gender',headerName:'Gender', valueGetter:(({row})=>row?.gender) },  {field:'status',headerName:'Status'},
            {field:'action', renderCell:(v)=>{
                return <Button onClick={()=>{
                     deleteResource(v.row?.id); 
                }} ><Icon color='error'>delete</Icon> </Button>
            } }
      ]; 
  const [rows,setRows]=useState([{ id:1, name:'Test',sex:'Male',status:'Active' }]);
  async function handleCreate(){
         createPatient({});  
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
      {/* <Button onClick={()=>handleCreate()}> <Icon>add</Icon> </Button> */}
      <Box sx={{minHeight:300,alignSelf:'stretch',height:500}}>
          <DataGrid rows={rows} onRowDoubleClick={(r)=>{
            if(onEditRow)
              onEditRow(r.row)
          }} columns={cols} pageSize={25}  showCellRightBorder={true}  />               
      </Box>
    </div>
  );
}

export default PatientsList;
