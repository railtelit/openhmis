import  Axios  from "axios";
import { useCallback, useState } from "react"
import { FhirClient } from "../fhir-service";
import { DEFAULT_FHIR_SERVER, DEFAULT_SYSTEM } from "../fhir.config";


export const useFhirCreate=(resourceType:string,id?:string):[any,any,(post:any)=>Promise<void>]=>{
         const [response,setResponse]=useState<any>(null); 
         const [error,setError]=useState(null); 

         const makeRequest=useCallback(async (payload:any)=>{
       //       const payload ={resourceType,identifiers:[
       //              {system:DEFAULT_SYSTEM,id:'1234'}
       //       ]}
               
             const create = Axios.post(`${DEFAULT_FHIR_SERVER}/${resourceType}`,{ resourceType, ...payload}).then(res=>{
                     setResponse(res.data)     
              }); 
   
            return create; 
                
         },[resourceType,id])  

         return [response,error,makeRequest]
}