import { authSlice, AuthStoreReducer } from '@ha/authstore'
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CustomizerReducer} from "@ha/apptheme";

export interface ServiceInterface{
        id:string,name:string,types:string[],servicename:string
}
export interface ServiceInfoInterface{
        bridge:{id:string,name:string,url:string,active:boolean,blacklisted:false},
        services:ServiceInterface[],
}

export interface AppStateInterface{
        isReady:boolean,isLoading:boolean,
        serviceinfo:ServiceInfoInterface|null,currentService?:ServiceInterface,
        statesMaster:any[],districtMaster:any[]
}
const initialState:AppStateInterface={isReady:false,serviceinfo:null,isLoading:false,
     statesMaster:[],districtMaster:[]}



const appSlice=createSlice({
    name:'appstate',
    initialState,
    reducers:{
        setReady:(state,action:PayloadAction<boolean>)=>({...state,isReady:action.payload}),
        setLoading:(state,action:PayloadAction<boolean>)=>({...state,isLoading:action.payload}),
        onLoadStateMaster:(state,action:PayloadAction<any[]>)=>({...state,statesMaster:action.payload}),
        onLoadDistrictMaster:(state,action:PayloadAction<any[]>)=>({...state,districtMaster:action.payload}),
        onServiceInfoLoad:(state,action)=>({...state,serviceinfo:action.payload}),
        setCurrentService:(state,action:PayloadAction<ServiceInterface>)=>({...state,currentService:action.payload})
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

export  const {setReady,onServiceInfoLoad,setCurrentService,
        
        setLoading,onLoadDistrictMaster,onLoadStateMaster}=appSlice.actions