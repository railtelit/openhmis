import  Axios  from "axios"
import { CodeableConcept } from "fhir/r4";
import { useCallback, useEffect, useState } from "react"
import { SNOMEDBROWSER_API, SNOMED_API, SNOMED_SYSTEM } from "../fhir.config"

export type SearchConceptType = 'descriptions' | 'concepts';  
export interface  SNOMEDQueryType{
    searchContext?:SearchConceptType,
    loadOnInit?:boolean
}
export interface SearchParams{
        term?:string,
        module?:string,
        limit?:string,
        skipTo?:number,
        returnLimit?:number,
        semanticTag?:string,
        semanticTags?:string,
        active?:boolean,
        conceptActive?:boolean,
        ecl?:string,        
}

const default_params={skipTo:0,limit:20,returnLimit:20,offset:0}
export const useSNOMEDQuery=(queryType:SNOMEDQueryType = {searchContext:'descriptions',loadOnInit:false})=>{
    const [snomedresults,setResults]=useState<CodeableConcept[]>([])
    const [isWorking,setIsWorking]=useState(false); 
  
    const searchDescriptions=(params:SearchParams={})=>{
            
            if(isWorking){
                    console.log('working Still..wait');
            }            
            if((params.term?.length||0) >3  ){
                console.log(`Searchfing `,params); 
                setIsWorking(true);
             const SNOMED_ENDPOINT = queryType.searchContext==='concepts'?SNOMED_API:SNOMEDBROWSER_API;
             Axios.get(`${SNOMED_ENDPOINT}/${queryType.searchContext}`,{params:{...default_params,termActive:true,...params}})                
                .then(res=>{
                    const conceptMapping = (res.data?.items as any[]).map( item=> queryType.searchContext==='concepts' ? item : item.concept );
                    // {conceptId->code , pt.term -> display }
                    const codeableMapping:CodeableConcept[] = conceptMapping.map( item => ({ text:item?.pt?.term , coding:[ {system:SNOMED_SYSTEM,code:item.conceptId,display:item?.pt?.term } ]  })  )
                    setResults( codeableMapping )
                    //console.log(res.data?.items); 
                    setIsWorking(false)
             })
        }
    }
      useEffect(()=>{
        // Load if Concept is 
        if(queryType.loadOnInit){
                 searchDescriptions({});
        };
    },[])
    return  {snomedresults,searchDescriptions}
}