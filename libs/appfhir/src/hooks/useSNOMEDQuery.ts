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

const default_params={skipTo:0,limit:50,returnLimit:50,offset:0}
export const useSNOMEDQuery=()=>{
    const [snomedresults,setResults]=useState<any>([])
    const searchDescriptions=(params:SearchParams={})=>{
            console.log(`Searchfing `,params); 
            if((params.term?.length||0) >3)
             Axios.get(`${SNOMED_API}/descriptions`,{params:{...default_params,...params}}).then(res=>{
                
                    setResults(res.data?.items )
                    console.log(res.data?.items)
             })
    }
    
    return  {snomedresults,searchDescriptions}
}