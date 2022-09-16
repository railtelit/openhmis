import LanguageInterface from "./lang.interface";

export const tg:LanguageInterface={
    authtype: {
        inputLabel: {
            "mobile": "మొబైల్ నంబర్", "aadhaar": "ఆధార్"
        },actionLabel:{verifyOtp:"OTPని ధృవీకరించండి"}
    },
    login: { title: "లాగిన్ చేద్దాం" },
    registration: {
        title: "ABHA ID కోసం నమోదు చేసుకోండి",
        method:{aadhaar:{title:"ఆధార్"},documentid:{title:"డ్రైవర్ లైసెన్స్"}}
    }
}
