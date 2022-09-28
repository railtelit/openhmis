import Axios from "axios"
import { toast } from "react-toastify"
import { environment } from "../../environments/environment"




export const useApiService=()=>{
        // 
        async function post( actionUrl:string, payload:any={}){            
            const response =  (await Axios.post(`${environment.API_ENDPOINT}/${actionUrl}`,payload )
               .catch(err=> { 
                   toast.error(err?.message,{}  );return {data:{}} 
               }) )
            return response.data||{}
        }
        
        async function query(queryUrl:string,params:any={}){
            console.log('querying here ')
            const response =  (await Axios.get(`${environment.API_ENDPOINT}/${queryUrl}`,{params} ).catch(err=> ({data:{}}) ) )
            return response?.data||{}            
        }

        return {post,query}
}