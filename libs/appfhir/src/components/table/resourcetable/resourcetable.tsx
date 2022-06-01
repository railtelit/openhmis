import { ColumnConfig } from '@ha/shared-ui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useFhirQuery } from '../../../hooks/useFhirQuery';
import { useFhirResolver } from '../../../hooks/useFhirResolver';
import styles from './resourcetable.module.scss';
import {HumanName,Patient} from 'fhir/r4'
import { ResourceName } from '../../resourceviews/resourceviews';



export const  NameField:(conf?:Omit<GridColDef,"field">)=>GridColDef = (conf:Omit<GridColDef,'field'> ={} )=>( {...conf, field:'name',renderCell:(params)=> <ResourceName  {...params.row?.name[0]}  />  } )


/* eslint-disable-next-line */
export interface ResourcetableProps {
     resourceType:string,
     params?:any,
     columns:ColumnConfig[]
}

export function ResourceTable({resourceType,params={},columns}: ResourcetableProps) {
  const [rows,loaderror,queryResource,deleteResource,createResource]=useFhirQuery(resourceType,params); 

  useEffect(()=>{
      queryResource(); 
  },[])

  return (
    <div className={styles['container']}>
        <DataGrid  autoHeight style={{minHeight:100}} columns={columns} rows={rows} /> 
    </div>
  );
}

export default ResourceTable;
