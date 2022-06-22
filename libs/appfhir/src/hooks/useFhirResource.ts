import { useCallback, useEffect, useState } from "react"
import { FhirClient } from "../fhir-service";


export const useFhirResource  = ( resourceType:string, resourceId?:any )=>{
     const [id,setId]= useState(resourceId); 
     const [resource,setResource]= useState(resourceType); 
     const [response,setResponse] = useState(null); 
     const [error,setError] = useState(null); 
     
     const makeRequest=useCallback(()=>{
            const query = new URLSearchParams(); 
            query.set('id',id||'0');
            FhirClient.request(`${resource}/${id}/${query}`).then(v=>{
                     setResponse(v)
            }).catch(setError)
     },[id,resource])
     function test(){
             //
     }
     useEffect(()=>{
         makeRequest();
     },[] )
    return [response,error,makeRequest]

}