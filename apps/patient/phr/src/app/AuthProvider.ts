import { createContext } from "react";



export const AuthContext=createContext({token:localStorage.getItem('token'), userid:'test' });
