import  Axios  from "axios";
import { useCallback, useState } from "react"
import { FhirClient } from "../fhir-service";
import { DEFAULT_FHIR_SERVER, DEFAULT_SYSTEM } from "../fhir.config";


export const useFhirUpdate=(resourceType:string,resource:any):[any,any,(post:any)=>Promise<any>]=>{
         const [response,setResponse]=useState<any>(null); 
         const [error,setError]=useState(null); 

         const doUpdate=useCallback(async (payload:any={})=>{
       //       const payload ={resourceType,identifiers:[
       //              {system:DEFAULT_SYSTEM,id:'1234'}
       //       ]}
             const id = resource?.id ; 
             const create = Axios.put(`${DEFAULT_FHIR_SERVER}/${resourceType}/${id}`,{ resourceType,...resource, ...payload}).then(res=>{
                     setResponse(res.data); 
                     return res.data;      
              }); 
   
            return create; 
                
         },[resourceType,resource])  

         return [response,error,doUpdate]
}