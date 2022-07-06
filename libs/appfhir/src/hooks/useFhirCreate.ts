import  Axios  from "axios";
import { DomainResource, Resource } from "fhir/r4";
import { useCallback, useState } from "react"
import { FhirClient } from "../fhir-service";
import { DEFAULT_FHIR_SERVER, DEFAULT_SYSTEM } from "../fhir.config";


export const useFhirCreate=<T extends DomainResource|Resource>(resourceType:string,id?:string):[any,any,(post:any)=>Promise<T>]=>{
         const [response,setResponse]=useState<T|null>(null); 
         const [error,setError]=useState(null); 

         const makeRequest=useCallback(async (payload:T)=>{
       //       const payload ={resourceType,identifiers:[
       //              {system:DEFAULT_SYSTEM,id:'1234'}
       //       ]}
               
             const create = await Axios.post(`${DEFAULT_FHIR_SERVER}/${resourceType}`,{  ...payload , resourceType }).then(res=>{
                     setResponse(res.data) ; 
                     return res.data as T    
              }); 
   
            return create; 
                
         },[resourceType,id])  

         return [response,error,makeRequest]
}