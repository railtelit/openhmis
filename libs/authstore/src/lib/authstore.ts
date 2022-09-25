import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { KeycloakProfile } from 'keycloak-js'

export interface AuthStateInterface{
    isLoggedIn:boolean,userInfo?:any,userProfile?:KeycloakProfile,
    userRoles:string[]
}


const authStateInitialState:AuthStateInterface={
    isLoggedIn:false,
    userInfo:null,userRoles:[]
}

export const authSlice=createSlice({
    name:'auth',
    initialState: authStateInitialState,
    reducers:{
        onProfileLoad:(state,action:PayloadAction<any>)=>({...state,userProfile:action.payload}),
        onLoadUserInfo:( state,action:PayloadAction<any>  )=>({...state,userInfo:action.payload}),
        setUserRoles:(state,action:PayloadAction<string[]>)=>({...state,userRoles:action.payload })
    }
})

export const AuthStoreReducer=authSlice.reducer

export const  {onProfileLoad,onLoadUserInfo,setUserRoles}=  authSlice.actions
