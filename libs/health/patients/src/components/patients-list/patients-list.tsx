import { useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import styles from './patients-list.module.scss';

/* eslint-disable-next-line */
export interface PatientsListProps {
    onEditRow?:(row:any)=>void,
    onDeleteRow?:(id:any)=>void,
    query?:any,
    rows?:any[]
}

export function PatientsList({onEditRow,query,rows=[],onDeleteRow=()=>{const i = 1; } }: PatientsListProps) {
  // const [patients,queryerror,makeRequest,deleteResource,createPatient] = useFhirQuery('Patient',query);

  const [ resolve]=useFhirResolver()
  const cols:GridColDef[]=[
            {field:'id',headerName:'Id'},  {field:'name',headerName:'Patient Name',flex:1,
              valueGetter:(v)=> resolve('name.0.family',v.row)  },
              {field:'contact',headerName:'Contact',valueGetter:(v)=> resolve('telecom.0.value',v.row) },
            {field:'gender',headerName:'Gender', valueGetter:(({row})=>row?.gender) },
            {field:'status',headerName:'Status',valueGetter:(({row})=>resolve('status',row))},
            {field:'action', renderCell:(v)=>{
                return <Button onClick={()=>{
                         onDeleteRow(v.row?.id);
                }} ><Icon color='error'>delete</Icon> </Button>
            } }
      ];

  return (
    <div className={styles['container']}>
      {/* <Button onClick={()=>handleCreate()}> <Icon>add</Icon> </Button> */}
      <Box sx={{minHeight:300,alignSelf:'stretch',height:500}}>
          <DataGrid rows={rows}  onRowDoubleClick={(r)=>{
            if(onEditRow)
              onEditRow(r.row)
          }} columns={cols} pageSize={25}  showCellRightBorder={true}  />
      </Box>
    </div>
  );
}

export default PatientsList;
