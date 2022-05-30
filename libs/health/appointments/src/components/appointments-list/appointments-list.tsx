import styles from './appointments-list.module.scss';
import { useFhirCreate, useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';


/* eslint-disable-next-line */
export interface AppointmentsListProps {

  onEditRow?:(row:any)=>void,
  onDeleteRow?:(id:any)=>void,
  query?:any,
  rows?:any[]
}

export function AppointmentsList({onEditRow,query,rows=[],onDeleteRow=()=>{const i = 1; } }: AppointmentsListProps) {

  const [ resolve]=useFhirResolver()

  const cols:GridColDef[]=[

    {field:'id',headerName:'Id'},
    //{field:'appointment_id',headerName:'Appointment ID', flex: 1,valueGetter:(v)=> resolve('note.text',v.row)  },
    {field:'patient',headerName:'Patient', flex: 1,valueGetter:(v)=> resolve('telecom.0.value',v.row) },
    {field:'appointmentType',headerName:'Type', flex: 1,valueGetter:(v)=> resolve('appointmentType.coding.0.code',v.row) },
    {field:'description',headerName:'Information', flex: 1,valueGetter:(v)=> resolve('description',v.row) },
    {field:'category',headerName:'Category', flex: 1,valueGetter:(v)=> resolve('serviceCategory.0.coding.0.display',v.row) },
    {field:'specialty',headerName:'Specialty', flex: 1,valueGetter:(v)=> resolve('specialty.0.coding.0.display',v.row) },
    {field:'start',headerName:'Date and Time', flex: 1, valueGetter:(v)=> resolve('start',v.row)},
    {field:'end',headerName:'End Date and Time', flex: 1,valueGetter:(({row})=>resolve('end',row))},
    {field:'action', renderCell:(v)=>{
      return <Button onClick={()=>{
         onDeleteRow(v.row?.id);
      }} ><Icon color='error'>delete</Icon> </Button>
      }
    }
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

export default AppointmentsList;
