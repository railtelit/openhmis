import { useDispatch, useSelector } from "react-redux";
import { ACTIONS, useApiService } from "../../hooks/useApiService"
import { AppState, onuserAuthorizedToken } from "../../store/app.store";
import NodeRSA from 'node-rsa'
export interface LoginInterface{
        mobilegenerateOtp:(data:{mobile:string})=>Promise<any>,
        verifyOtp:( data:{ otp:string,  txnId:string,})=>Promise<any>,
        userAuthorizedToken:(data:{healthId:string,txnId:string,Ttoken:string})=>Promise<any>
}
export const useLoginService=():LoginInterface=>{
    const apiService=useApiService();
    const appStore=useSelector( (state:AppState)=>state.auth ); 
    const storedispatch=useDispatch()
    const service:LoginInterface={ 
        
        async mobilegenerateOtp(data) {
            //
            const result = (await apiService.doAction(ACTIONS.login.mobilegenerateOtp,{...data})).data
            return result
        },
        async verifyOtp(data) {
            const {otp}=data; 
            const CERT = await apiService.getHealthidCert(); 
            const enc = new NodeRSA(); 
            const otpbuffer=Buffer.from(otp)
            if(CERT){
                
                enc.setOptions({environment:'browser',encryptionScheme:'pkcs1'}); 
                
                //console.log('OTP:'+otp)
                const otp_encrypted = enc.importKey( ( CERT ),'pkcs8-public').encrypt(  (otp),'base64');
                //const otp_encrypted='iyn240uj0dnOPbEg8PEgPLzoYkATOoT7e67e1t92FiSGVsTXBcHYslyQkq8F+dCk775XywfkM19fcZSCFe/Yyovf2y+4CBgKw4JoCaODLKFJu+vkccQk57jIg3vbVyouNW7o6lL9bQEhmvpLRD48hoCGIA4BFx6F5viR2DWg8L6uk91RwRqXG7OZnUhg5XBVC8dtP2j2nz49IeXJFp47FvwOHBBwiTFLePybT3Y0k2iPphuF1YsVRIlfgEDX54yxpyn5cRR46fYIlDerTMPBSTqP1n9YTMdTsrWE+zR8tJGCfnhLNrpUTZRdjo2q5UsBiClg/VbUPzAhY00ehutQ6lvCum99jwDwmcfoSkUgC15M/ahpTbLd95ipT9Nw2WDu8XS6LdO9WRoMf2tXD21j2QCTA5WCwOu2YuGB3il+xHiCIpBqZIm//KdxzbJ30LtJJQy7upxhRlPkR6XryiJHOGhWgFfnxMvQkrQYUSvIjJUynlzfhY9td8FExrk6FEdDaR8s+J6Zv52AWoaX//J+xuDlK8rn3Sf5v/lwbxKRcH8+i97Qt018KAPoZ702+TL+P3uOGVKZviSu3KYzk+T1MOK5wGYf+5CsGjoaP/scvXs3LmeL7Z2bdaNLbz2DCbO9wZNdbcf6Ctsj9tMSrmzEmRSC/r5D8NF2T9NRyvMVslw='
                //console.log(otp_encrypted);
                const result = (await apiService.doAction(ACTIONS.login.verifyOtp,{...data,otp:otp_encrypted})).data
                return result
            }

            
            //const otp_encrypted = encrypt.encrypt(otp);
            //const otp_encrypted ='NNDpdtTZASkfnq37RjUxWc6DokHDHkhpjKDPm10N8QA3bV1KKMKUrIwyJZj4PgGxZR6lV8V2cMWIbTrmJQencT1zLn2rOalcYzW4XACREyy3Isn1ZheljOhLnmB9wKdtphzR5ld+ijpd0icFj9okf80YxCA2bb3hj8OB8jzDN2fmXjlji98EQo9iqn0cjSWKc94hRaAXzJjgEgkvX/2VIwGPIFSVRuB9vlR/3Tvp4G/8WVk/rW+pD7f0exoNhEijmCMDUlNNDjQe2jb/jBOMvkHaUXX8f/79+VrtsRojGAbb1UoyUobXlPsN7+sSMhCwKrCMsuvQ4cehFhQcg0N0ItbgQIle8kY4ss3dbOilKNJC5JMtLxICImHQUDd+4W06CSdx+JTD24pbTTmyEDPdNQtQpYG8mrC/xGOP2Q7ffGkHZagKu1+8Jazvbp0mbBSbHyHAnEA7pekePSkVxGBsb5Osqg1eBh8RZKpzWN2WYFyzL6u3cBZCnxSFVIQ4RcOFCHg64iP1HKjdPPz6VgZCv6emEAe6YylkPauMGDDuw3DPra1O99Y4eEnNuqR+JqeBYlkYYzFyiVAiMbxjNa7WZIq2AbDhoGv+ZGk6Tu5uZIR37n170rHaHOfMyJcm/1prU0NLOctS50VMXzxYGHOmH0BeLl30VkNX0Ix0Y+th4yY='

            const result ={}
            return result
        },
        async userAuthorizedToken(data) {
            // Add Token 
            const {Ttoken,...payload}=data; 

            const result = (await apiService.doAction(ACTIONS.login.userAuthToken,payload,
                    {'T-Token':Ttoken} )).data; 
            storedispatch(onuserAuthorizedToken(result))        
            return result            
        },
}
    return service
}