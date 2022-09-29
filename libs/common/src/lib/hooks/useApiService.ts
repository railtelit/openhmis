import Axios from "axios"
import { toast } from "react-toastify"


export const useApiService=()=>{
        // 
        async function post( actionUrl:string, payload:any={}){            
            const response =  await Axios.post(`${actionUrl}`,payload )              
            return response.data||{}
        }
        
        async function query(queryUrl:string,params:any={}){
            console.log('querying here ',params)
            const response =  (await Axios.get(`${queryUrl}`,{params} ).catch(err=> ({data:{}}) ) )
            return response?.data||{}            
        }

        return {post,query}
}