import { useEffect } from "react"
import { useSelector } from "react-redux"


export const useReadState=<T>(stateName:string)=>{
    const state = useSelector((state:any)=>state?.common?.[stateName])
  
    return {state}
}


export default useReadState