import { useNavigate } from "react-router-dom"
import { APP_ACTIONS } from "../../hooks/actions"
import { QUERIES_URL } from "../../hooks/queries"
import { ACTIONS, useApiService } from "../../hooks/useApiService"
interface CreateAadhaarRequest{
     healthId:string,
     firstName:string,middleName:string,lastName:string, 
     password:string,txnId:string,pinCode:string,stateCode?:string, 
     email:string,address:string,restrictions?:string
}
interface RegisterServiceInterface{
    aadhaar:{
        checkHealthIdExists:(data:{healthId:string})=>Promise<any>,
        generateAdhaarMobileOtp:(data:{aadhaar:string})=>Promise<any>
        verifyAadhaarMobileOtp:(data:{otp:string,txnId:string})=>Promise<any>,
        generateMobileOTP:(data:{mobile:string,txnId:string})=>Promise<any>,
        verifyMobileOTP:(data:{otp:string,txnId:string})=>Promise<any>,
        createHealthIdwithAadhar:(data:CreateAadhaarRequest)=>Promise<any>
    },
    options:{
        getStates:()=>Promise<any[]>,
        getDistricts:(data:{stateCode:string})=>Promise<any[]>
    }
}

export const useRegisterService=()=>{
    const apiService=useApiService(); 
    const navigate=useNavigate()
    const service:RegisterServiceInterface={
        aadhaar: {
            checkHealthIdExists: function (data: { healthId: string} ): Promise<any> {
                return apiService.doAction(APP_ACTIONS.registration.aadhaar.existsByHealthId, data)
            },
            generateAdhaarMobileOtp: function (data: { aadhaar: string} ): Promise<any> {
                return apiService.doAction(APP_ACTIONS.registration.aadhaar.generateAadhaarOtp, data)
            },
            verifyAadhaarMobileOtp: function (data: any): Promise<any> {
                return apiService.doAction(APP_ACTIONS.registration.aadhaar.verifyAadhaarOTP, data)
            },
            async generateMobileOTP(data) {
                return apiService.doAction(APP_ACTIONS.registration.aadhaar.generateMobileOTP, data)

            },
            async verifyMobileOTP(data) {
                return apiService.doAction(APP_ACTIONS.registration.aadhaar.verifyMobileOTP, data)

            },
            createHealthIdwithAadhar: async function (data: CreateAadhaarRequest): Promise<any> {
                console.log('Sending ', data)
                //return
                const response = await apiService.doAction(APP_ACTIONS.registration.aadhaar.createHealthIdByAadhaar,
                    { ...data, restrictions: '' })
                if (response.data.token) {
                    alert('Generated Account')
                    localStorage.setItem('token', response.data.token)
                    navigate('/account')
                }else{
                    alert('Token Expired Try Again');
                    navigate('/register')
                }

            },
        },
        options: {
            getStates: async function (): Promise<any[]> {
                const results =   (await apiService.query(QUERIES_URL.GET_STATES,{},{})).data as any[];
                return results
            },
            getDistricts: async function (data:{stateCode:string}): Promise<any[]> {
                const results =   (await apiService.query(QUERIES_URL.GET_DISTRICTS,{stateCode:data.stateCode}
                                        ,{})).data as any[];
                return results
            }
        }
    }

    return service
}