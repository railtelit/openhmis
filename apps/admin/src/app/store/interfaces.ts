import { ServiceInterface } from "./app.store";


export interface ServiceUpdateInterface{
        service:ServiceInterface,
        stateCode:string,districtCode:string
}

export interface AdminUserInterface{
        userid:string,
        serviceid:string,
        username:string,
        isActive:boolean,
        stateCode?:boolean,
        adminuserid?:string
}
export type ServiceMasterInterface = ServiceInterface & {serviceid:string,districtCode:string,stateCode:string} 

export type ServiceType  = 'HIP'|'HIU'