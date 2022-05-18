import { useCallback, useState } from "react"
import { FhirClient } from "../fhir-service";
import { DEFAULT_SYSTEM } from "../fhir.config";


export const useFhirCreate=(resourceType:string,id?:string):[any,any,()=>Promise<void>]=>{
         const [response,setResponse]=useState<any>(null); 
         const [error,setError]=useState(null); 

         const makeRequest=useCallback(async ()=>{
             const payload ={resourceType,identifiers:[
                    {system:DEFAULT_SYSTEM,id:'1234'}
             ]}
               
              const create =  await FhirClient.request({url:resourceType,method:'POST',
                        body:JSON.stringify(payload)
                    } ).then(res=>{
                      setResponse(res);
                }).catch(setError); 
                return create; 
         },[resourceType,id])  

         return [response,error,makeRequest]
}