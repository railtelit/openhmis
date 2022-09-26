import { useKeycloak } from "@ha/authstore"
import  Axios  from "axios"
import { useDispatch } from "react-redux";
import { BASE_URLS } from "../endpoints"
import { onServiceInfoLoad } from "../store/app.store";


export const useAdminService=()=>{
        const kc =useKeycloak();
        const appAction=useDispatch()
      async function  loadServices(){
             const response=  (await Axios.get(`${BASE_URLS.API_ENDPOINT}/admin/services`,{headers:{'Authorization':`Bearer ${kc?.token}`}})).data
             appAction(onServiceInfoLoad(response));
             return response
            //
      }
      async function testApi(){
             Axios.get(`${BASE_URLS.API_ENDPOINT}/admin/services`,{headers:{'Authorization':`Bearer ${kc?.token}`}})
      }

      return  {loadServices,testApi}
}