import  Axios  from "axios"
import { useCallback, useState } from "react"
import { SNOMED_API } from "../fhir.config"


const default_params={skipTo:0,limit:50,returnLimit:50}
export const useSNOMEDQuery=()=>{
    const [snomedresults,setResults]=useState<any>([])
    const searchDescriptions=(params:any={})=>{
             Axios.get(`${SNOMED_API}/descriptions`,{params:{...default_params,...params}}).then(res=>{
                    setResults(res)
             })
    }
    
    return  {snomedresults,searchDescriptions}
}