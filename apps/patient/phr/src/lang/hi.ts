import LanguageInterface from "./lang.interface";


export  const hi:LanguageInterface ={
    authtype: {
        inputLabel: {
            "mobile": "मोबाइल नंबर", "aadhaar": "आधार"
        },actionLabel:{verifyOtp:"ओटीपी सत्यापित करें"}
    },
    login: { title: "लॉग इन करें" },
    registration: {
        title: "आभा आईडी के लिए रजिस्टर करें",
        method:{aadhaar:{title:"आधार"
        },documentid:{title:"चालक लाइसेंस"}}
    }
}