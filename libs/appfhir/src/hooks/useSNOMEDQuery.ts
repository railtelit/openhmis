import  Axios  from "axios"
import { useCallback, useState } from "react"
import { SNOMED_API } from "../fhir.config"



export const useSNOMEDQuery=()=>{
    const [snomedresults,setResults]=useState<any>([])
    const searchDescriptions=(params:any={skipTo:0,returnLimit:50})=>{
             Axios.get(`${SNOMED_API}/descriptions`,{params}).then(res=>{
                    setResults(res)
             })
    }
    
    return  {snomedresults,searchDescriptions}
}