

// String.Access Resolver : 

import { useCallback, useEffect, useState } from "react"

  
export const useFhirResolver  = (resource?:any,opath?:string):[
        resolve:(p:string,o?:any)=>any,res:any
    ]=>{
const resolve = useCallback((path:string,otherResource?:any)=> {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, ( otherResource||resource) || window.self)
    }, [resource]
  )

  const [result,setResult]=useState(resolve(''))
  
  useEffect(()=>{
    if(resource!==undefined && opath){
        resolve(opath)
    }
  },[resource,opath])
  return  [resolve,result]
    
}