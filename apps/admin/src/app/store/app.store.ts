import { authSlice, AuthStoreReducer } from '@ha/authstore'
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CustomizerReducer} from "@ha/apptheme";


export interface ServiceInfoInterface{
        bridge:{id:string,name:string,url:string,active:boolean,blacklisted:false},
        services:{id:string,name:string,types:string[]}[]
}

export interface AppStateInterface{
        isReady:boolean,
        serviceinfo:ServiceInfoInterface|null
}
const initialState:AppStateInterface={isReady:false,serviceinfo:null}



const appSlice=createSlice({
    name:'appstate',
    initialState,
    reducers:{
        setReady:(state,action:PayloadAction<boolean>)=>({...state,isReady:action.payload}),
        onServiceInfoLoad:(state,action)=>({...state,serviceinfo:action.payload})
    }
})

export const appStore=configureStore({
    reducer:{
        appstate:appSlice.reducer,
        auth:AuthStoreReducer,
        CustomizerReducer
    }
})


export type AppState =  ReturnType< typeof appStore.getState>

export type AppDispatch=typeof appStore.dispatch

export type AppStoreType = typeof appStore

export  const {setReady,onServiceInfoLoad}=appSlice.actions