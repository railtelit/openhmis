import { ColumnConfig } from '@ha/shared-ui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useFhirQuery } from '../../../hooks/useFhirQuery';
import { useFhirResolver } from '../../../hooks/useFhirResolver';
import styles from './resourcetable.module.scss';
import {ContactPoint, HumanName,Patient} from 'fhir/r4'
import { ActiveStatus, ResourceContactPoint, ResourceName } from '../../resourceviews/resourceviews';
import {ActionButton} from '@ha/shared-ui'

export type ResourceColDef = Omit<GridColDef,"field">; 

export interface ActionFieldConfig{
     actionName:string, 
     label:string ,  
     navigateTo?:string,
     onClick?:()=>void
}


export const  NameField:(conf?:Omit<GridColDef,"field">)=>GridColDef = (conf:Omit<GridColDef,'field'> ={} )=>( {...conf, headerName:'Name',  field:'name',renderCell:(params)=> <ResourceName  {...params.row?.name?.[0]}  />  } );

export const  ReferenceDisplayField:( fieldName:string, conf?:Omit<GridColDef,"field">)=>GridColDef = ( fieldName:string, conf:Omit<GridColDef,'field'> ={} )=>( {...conf,field:fieldName,renderCell:(params)=> params.row?.[fieldName]?.display||''  } )

export const  SimpleActionField:( actionConfig:ActionFieldConfig, conf?:ResourceColDef)=>GridColDef = ( config:ActionFieldConfig,  conf:ResourceColDef ={} )=>( {...conf,  field:config.actionName,renderCell:(params)=> <ActionButton  {...config} /> }) 

export const  TelecomField:(system:ContactPoint["system"],conf?:Omit<GridColDef,"field">)=>GridColDef = ( system:ContactPoint["system"],conf:Omit<GridColDef,'field'> ={} )=>( {  headerName:'Contact',...conf,field:system as string,
                        renderCell:(params)=> <ResourceContactPoint  {...(params.row?.telecom as any[])?.find(r=>r.system===system )  }  />  } )
export const  BooleanField:(fieldName:string,conf?:Omit<GridColDef,"field">)=>GridColDef = ( fieldName:string, conf:Omit<GridColDef,'field'> ={} )=>( {...conf,   field:'active',renderCell:(params)=> <ActiveStatus  value={params.row?.[fieldName]}   />  } )



/* eslint-disable-next-line */
export interface ResourcetableProps {
     resourceType:string,
     params?:any,
     columns:ColumnConfig[],
     reload?:boolean,
     refreshRow?:any,
     
}

export function ResourceTable({resourceType,params={},columns,reload,refreshRow}: ResourcetableProps) {
  const [rows,loaderror,queryResource,deleteResource,createResource]=useFhirQuery(resourceType,params); 
  const [runquery,setrunquery]=useState(false)
  useEffect(()=>{
      queryResource(); 
  },[]); 
  useEffect(()=>{
        if(refreshRow?.id){
            queryResource();
        }
  },[refreshRow])
  
  function refreshRows(){
      // 
  }
 
  return (
    <div className={styles['container']}>
        <DataGrid  autoHeight style={{minHeight:100}} columns={columns} rows={rows} /> 
    </div>
  );
}

export default ResourceTable;
