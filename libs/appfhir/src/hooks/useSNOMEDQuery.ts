import  Axios  from "axios"
import { useCallback, useState } from "react"
import { SNOMED_API } from "../fhir.config"

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
}

const default_params={skipTo:0,limit:20,returnLimit:20,offset:0}
export const useSNOMEDQuery=()=>{
    const [snomedresults,setResults]=useState<any>([])
    const [isWorking,setIsWorking]=useState(false)
    const searchDescriptions=(params:SearchParams={})=>{
            if(isWorking){
                    console.log('working Still..wait');
            }
            
            if((params.term?.length||0) >3 ){
                console.log(`Searchfing `,params); 
                setIsWorking(true);
             Axios.get(`${SNOMED_API}/descriptions`,{params:{...default_params,...params}})                
                .then(res=>{
                    const conceptMapping = (res.data?.items as any[]).map( item=>item.concept );
                    setResults( conceptMapping )
                    //console.log(res.data?.items); 
                    setIsWorking(false)
             })
        }
    }
    
    return  {snomedresults,searchDescriptions}
}