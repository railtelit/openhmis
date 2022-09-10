import Axios  from "axios"
import { environment } from "../../environments/environment"


export const ACTIONS={
    login:{
         init:'v1/auth/init'
    }
}

export function  useApiService(){
    async function doAction(url:string, data:any ){
         return Axios.post( `${environment.API_ENDPOINT}/${url}`,data)
    }
    async function query(url:string,params:any){
             return Axios.get(url,{params})
    }
    return  {}

}