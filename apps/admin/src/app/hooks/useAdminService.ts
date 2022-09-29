import { useKeycloak } from "@ha/authstore"
import { useApiService } from "@ha/common";
import  Axios  from "axios"
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URLS } from "../endpoints"
import { AppState, onLoadStateMaster, onServiceInfoLoad } from "../store/app.store";
import { Queries } from "./queries";
 


export const useAdminService=()=>{
        const kc =useKeycloak();
        const appAction=useDispatch();
        const appState=useSelector((state:AppState)=> state.appstate)
        const apiService=useApiService()
      async function  loadServices(){
                        
                    const response= await apiService.query(Queries.admin.getServices)
                    appAction(onServiceInfoLoad(response));
                    return response
             
            
      }
      async function loadStateMaster(){
              const list =await apiService.query(Queries.common.getStates);
              appAction(onLoadStateMaster(list||[]))
              return list
      }
      async function loadDistrictMaster({districtCode}:any){
              const list =await apiService.query(Queries.common.getDistricts,{districtCode});
              return list
      }
      
      async function checkHeartbeat(){
             if(appState.serviceinfo?.bridge.url){
                    // return (await Axios.get(appState.serviceinfo.bridge.url+`/v0.5/heartbeat`)).data
                    return apiService.query(Queries.admin.heartbeat)
             }
      }

      return  {loadServices,checkHeartbeat,loadDistrictMaster,loadStateMaster}
}