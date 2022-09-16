


export  default interface LanguageInterface{
        authtype:{ inputLabel:{ "mobile":string,"aadhaar":string },actionLabel:{verifyOtp:string} },
        login:{title:string},
        registration:{title:string,method:{aadhaar:{title:string},documentid:{title:string}} }
}