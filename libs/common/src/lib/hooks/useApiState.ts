import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../common-store/common-store";
import { useApiService } from "./useApiService"

export interface UseApiStateInterface{
        loadOnStart?:boolean
        endpoint?:string, 
        processGroup?:string,
        processName?:string,
        initialState?:any
}
export const useApiState = <T=any>( stateName:string, props:UseApiStateInterface ={loadOnStart:true} )=>{

    const apiService=useApiService(); 
    const state:T = useSelector((state:any)=> state?.common?.[stateName] ) as T
    const dispatch  = useDispatch()
    useEffect(()=>{
            if(props.loadOnStart??true){
                     console.log(`Loading State..`)
                    loadState();
            }
            if(!state && props.initialState!== undefined){
                        dispatch(setState({[stateName]:props.initialState}))
            }
    },[])

    async function loadState(){
            
                const url = props.endpoint||
                        ( `${props?.processGroup||''}/${stateName}` )
                console.log(`Loading ${url}`)
              await apiService.query(url).then(
                 val=>{
                     dispatch(setState( {[stateName]:val} ));
                     return val
                 }
              )            
    }

    return {state,loadState}
}

export default useApiState