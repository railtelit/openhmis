import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setState } from "../common-store/common-store"


export const useReadState=<T>(stateName:string)=>{
    const state = useSelector((state:any)=>state?.common?.[stateName])
    const doAction=useDispatch()
    function setStateValue(value:any){
             doAction(setState({[stateName]:value}))
    }
    return {state,setStateValue}
}
export const useAuthState=<T>()=>{
    const state:any = useSelector((state:any)=>state?.auth)
    return state
}


export default useReadState