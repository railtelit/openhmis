import { ACTIONS, useApiService } from "../../hooks/useApiService"

export interface LoginInterface{
        mobilegenerateOtp:(data:{mobile:string})=>Promise<void>,
        verifyOtp:( data:{ otp:string,  txnId:string,})=>Promise<void>,
        userAuthorizedToken:(data:{healthId:string,txnId:string})=>Promise<void>
}
export const useLoginService=():LoginInterface=>{
    const apiService=useApiService();
    const service:LoginInterface={ 
        async mobilegenerateOtp(data) {
            //
            const result = (await apiService.doAction(ACTIONS.login.mobilegenerateOtp,{...data})).data
        },
        async verifyOtp(data) {
                //
        },
        async userAuthorizedToken(data) {
            //
        },
}
    return service
}