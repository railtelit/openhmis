import { useCallback, useEffect, useState } from "react"
import { FhirClient, FhirService } from "../fhir-service";
import { DEFAULT_FHIR_SERVER, DEFAULT_SYSTEM } from "../fhir.config";


import  Axios from 'axios'; 
import { Bundle, DomainResource, Resource } from "fhir/r4";



export const useFhirQuery = <T extends DomainResource|Resource>(resourceType:string,params:any={}):[results:T[],errors:any,doQuery:(params?:any)=>Promise<void | T[]>,
                deleteResource:(id?:string)=>void, createResource:(payload:any)=>Promise<T>]=>{
    const [resource,setResource]=useState(resourceType); 
    const [results,setResults]=useState<any[]>([]); 
    const [error,setError]=useState(null); 

    const makeRequest=useCallback( async (searchParams:any={})=>{
            //console.log(`Calling Q`)
            const query = FhirService.createQuery({ ...params, ...searchParams});            
            const reslist =  FhirClient.request(`${resourceType}?${query}`,).then(res=>{
                    const entries = (res?.entry||[]) as any[]; 
                    const results =  entries.map(r=> ({...r.resource,fullUrl:r.fullUrl}) )  
                    setResults(results); 
                    return results as T[]  
            }).catch( (reason)=>{
                    setError(reason); 
                    
            } ); 
            return reslist ; 
    },[resourceType,params]);  

    const deleteResource = useCallback(async (id?:string)=>{
        if(id)
        FhirClient.delete(`${resourceType}/${id}`).then(res=>{
                setResults((r)=> r.filter(ri=> ri.id!==id ) )
        }).catch(setError)
    },[resourceType]);
 
    const createResource=useCallback(async (payload:any={}):Promise<T>=>{
        //   payload ={resourceType, gender:'male', identifier:[
        //             { system:DEFAULT_SYSTEM,value:'111112'}
        //     ],birthDate:'1987-10-02',name:[{family:'Rocks'}]}
        const id=`P1`;
        const create = Axios.post(`${DEFAULT_FHIR_SERVER}/${resourceType}`,{...payload,resourceType}).then(res=>{
            setResults((v)=>[...v,res.data]); 
            return res.data
        }); 
 
          return create; 
   },[resourceType]) ;
   
  
    
    // useEffect(()=>{
    //     makeRequest();
    // },[])
    // useEffect(()=>{
    //     makeRequest();
    // },[params])

    return [results,error,makeRequest,deleteResource,createResource]
}