import styles from './appointments-list.module.scss';
import { useFhirCreate, useFhirQuery, useFhirResolver } from '@ha/appfhir';
import { Button, Icon } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridColType, GridColumns } from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import {Routes, Route, useNavigate} from 'react-router-dom';
import VitalSign from '../../views/vital-sign/vital-sign';

/* eslint-disable-next-line */
export interface AppointmentsListProps {

  onEditRow?:(row:any)=>void,
  onDeleteRow?:(id:any)=>void,
  query?:any,
  rows?:any[]
}

export function AppointmentsList({onEditRow,query,rows=[],onDeleteRow=()=>{const i = 1; } }: AppointmentsListProps) {

  const [ resolve]=useFhirResolver()

  const navigate = useNavigate();

  const cols:GridColDef[]=[

    {field:'id',headerName:'Id'},
    //{field:'appointment_id',headerName:'Appointment ID', flex: 1,valueGetter:(v)=> resolve('note.text',v.row)  },
    {field:'patient',headerName:'Patient', flex: 1,valueGetter:(v)=> resolve('participant.0.actor.display',v.row) },
    {field:'appointmentType',headerName:'Type', flex: 1,valueGetter:(v)=> resolve('appointmentType.coding.0.display',v.row) },
    {field:'description',headerName:'Information', flex: 1,valueGetter:(v)=> resolve('description',v.row) },
    {field:'category',headerName:'Category', flex: 1,valueGetter:(v)=> resolve('serviceCategory.0.coding.0.display',v.row) },
    {field:'specialty',headerName:'Specialty', flex: 1,valueGetter:(v)=> resolve('specialty.0.coding.0.display',v.row) },
    {field:'status',headerName:'Status', flex: 1,valueGetter:(v)=> resolve('status',v.row) },
    {field:'Status Icon', renderCell:(v)=>{
        let statusIcon = resolve('status',v.row);
        if(statusIcon == "proposed"){
          return <Icon color='primary'>edit_note</Icon>
        }else if(statusIcon == "pending"){
          return <Icon color='warning'>pending</Icon>
        }else if(statusIcon == "booked"){
          return <Icon color='primary'>bookmark_added</Icon>
        }else if(statusIcon == "arrived"){
          return <Icon color='warning'>bookmark_added</Icon>
        }else if(statusIcon == "fulfilled"){
          return <Icon color='success'>done_all</Icon>
        }else if(statusIcon == "cancelled"){
          return <Icon color='error'>cancel</Icon>
        }else if(statusIcon == "noshow"){
          return <Icon color='error'>event_busy</Icon>
        }else if(statusIcon == "entered-in-error"){
          return <Icon color='error'>error_outline</Icon>
        }else if(statusIcon == "checked-in"){
          return <Icon color='primary'>checklist</Icon>
        }else{
          return <Icon color='warning'>hourglass_bottom</Icon>
        }
      }
    },
    {field:'start',headerName:'Start Date & Time', flex: 1,  renderCell:(v)=>{
        var start = resolve('start',v.row);
        return start.substring(0, 16)
      }
    },
    {field:'end',headerName:'Start Date & Time', flex: 1,  renderCell:(v)=>{
        var end = resolve('end',v.row);
        return end.substring(0, 16)
      }
    },
    {field:'Action', renderCell:(v)=>{
      return <ButtonGroup variant="text" aria-label="outlined transparent button group">
                <Button onClick={()=>{
                      navigate('patient-evaluation/'+v.row?.id);
                    }} >
                    <Icon color='primary'>open_in_new</Icon>
                </Button>

                <Button onClick={()=>{onDeleteRow(v.row?.id);}} style={{ width: 10 }}>
                    <Icon color='error'>delete</Icon>
                </Button>
              </ButtonGroup>
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
          }} columns={cols} pageSize={25} showCellRightBorder={true}  />
      </Box>

    </div>

  );
}

export default AppointmentsList;
