export const APP_ACTIONS={
    login:{
         mobilegenerateOtp:'v2/registration/mobile/login/generateOtp',
         verifyOtp:'v2/registration/mobile/login/verifyOtp',
         userAuthToken:'v2/registration/mobile/login/userAuthorizedToken',
    }, 
    registration:{
        aadhaar:{
             existsByHealthId:'v1/search/existsByHealthId',
             generateAadhaarOtp:'v1/registration/aadhaar/generateOtp',
             verifyAadhaarOTP:'v1/registration/aadhaar/verifyOTP',
             generateMobileOTP:'v1/registration/aadhaar/generateMobileOTP',
             verifyMobileOTP:'v1/registration/aadhaar/verifyMobileOTP',
             createHealthIdByAadhaar:'v1/registration/aadhaar/createHealthIdWithPreVerified'
        }
    }   
}
