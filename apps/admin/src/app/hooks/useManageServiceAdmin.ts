import { useApiService } from "@ha/common";
import Axios  from "axios";
import { toast } from "react-toastify";
import { ServiceInterface } from "../store/app.store";
import { ServiceUpdateInterface } from "../store/interfaces";
import { Actions } from "./actions";
import { Queries } from "./queries";



export const useManageServiceAdmin=()=>{

        const apiService=useApiService(); 

     async function  initializeService(service:ServiceInterface){
             //
             if(!service){
                 return toast.error(`Invalid Service Request `); 
             }
           return apiService.post(Actions.manageAdminUser.initializeService,service)
     }
     async function loadDistricts(stateCode:string){
                return apiService.query(Queries.common.getDistricts,{stateCode})
     }
     async function getServiceAdmin(params:{serviceid:string}){
        return apiService.query(Queries.admin.manageService.getServiceAdmin,params)
     }

     async function updateServiceInfo(update:ServiceUpdateInterface){
                if(!update.service)return toast(`No Service Selected`); 
                return apiService.post(Actions.manageAdminUser.updateServiceInfo,update)
     }
     
     async function createServiceAdminUser(service:ServiceInterface){
                return apiService.post(Actions.manageAdminUser.createServiceAdmin,service).catch(err=>{
                         toast.error(`Unable to Create ${err.message}`)
                })
     }

     return {initializeService,updateServiceInfo,getServiceAdmin,createServiceAdminUser,
        loadDistricts}
}