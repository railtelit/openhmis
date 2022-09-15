import Axios  from "axios"
import { environment } from "../../environments/environment"
import { CERT_URLS } from "../endpoints";
import { APP_ACTIONS } from "./actions";
import { TEST_ACTIONS } from "./testactions";

environment.production=true
export const ACTIONS=environment.production?APP_ACTIONS:TEST_ACTIONS

export function  useApiService(){
    async function doAction(url:string, data:any,headers:any={} ){
        console.log(headers)
          return  environment.production ? Axios.post( `${environment.API_ENDPOINT}/${url}`,data,
                                { headers:{...headers} })         
                        :Axios.get( `${environment.MOCK_ENDPOINT}/${url}`,data)         
    }
    async function query(url:string,params:any,headers:any={}){
             return Axios.get(`${environment.API_ENDPOINT}/${url}`,{params,headers})
    }
    async function getBinaryData(url:string,params:any,headers:any={}){
             return Axios.get(`${environment.API_ENDPOINT}/${url}`,{params,headers,responseType:'blob',responseEncoding:'base64'})
    }
    async function getHealthidCert(){
            let CERT = localStorage.getItem('HID_CERT'); 
            if(!CERT){
                 CERT = (await query(CERT_URLS.HIP_CERT,{})).data;
                 if(CERT)
                    localStorage.setItem('HID_CERT',CERT);
            }; 
            return CERT
    }
    return  {doAction,query,getHealthidCert,getBinaryData}

}