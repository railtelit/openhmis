import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { KeycloakProfile } from 'keycloak-js'

export interface AuthStateInterface{
    isLoggedIn:boolean,userInfo?:any,userProfile?:KeycloakProfile,token:string|null
    userRoles:string[]
}


const authStateInitialState:AuthStateInterface={
    isLoggedIn:false,token:null,
    userInfo:null,userRoles:[]
}

export const authSlice=createSlice({
    name:'auth',
    initialState: authStateInitialState,
    reducers:{
        onReady:(state,action:PayloadAction<{token:string}>)=>({...state,token:action.payload.token}),
        onProfileLoad:(state,action:PayloadAction<any>)=>({...state,userProfile:action.payload}),
        onLoadUserInfo:( state,action:PayloadAction<any>  )=>({...state,userInfo:action.payload}),
        setUserRoles:(state,action:PayloadAction<string[]>)=>({...state,userRoles:action.payload })
    }
})

export const AuthStoreReducer=authSlice.reducer

export const  {onProfileLoad,onLoadUserInfo,setUserRoles,onReady} =  authSlice.actions
