import { useKeycloak } from "@ha/authstore"
import  Axios  from "axios"
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URLS } from "../endpoints"
import { onServiceInfoLoad } from "../store/app.store";
import { Queries } from "./queries";
import { useApiService } from "./useApiService";


export const useAdminService=()=>{
        const kc =useKeycloak();
        const appAction=useDispatch();
        const apiService=useApiService()
      async function  loadServices(){
                        
                    const response= await apiService.query(Queries.admin.getServices)
                    appAction(onServiceInfoLoad(response));
                    return response
             
             return {}
            //
      }
      async function testApi(){
             Axios.get(`${BASE_URLS.API_ENDPOINT}/admin/services`,{headers:{'Authorization':`Bearer ${kc?.token}`}})
      }

      return  {loadServices,testApi}
}