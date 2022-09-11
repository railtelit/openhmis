import { createContext } from "react";

export interface AuthMethodConfig{
        inputLabel:string,length?:number
}
export type AuthType='mobile'|'aadhaar';
export const AuthMethods:Record<AuthType,AuthMethodConfig>={mobile:{inputLabel:'Mobile No',length:10}
        ,aadhaar:{inputLabel:'Aadhaar',length:12}}

export interface AuthContextInterface{
                 token?:string|null,userid?:string,captcha?:string|null
}
export const AuthContext=createContext<AuthContextInterface>(
        {token:localStorage.getItem('token'), userid:'test',captcha:'' });
