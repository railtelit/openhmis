import { AuthStoreReducer } from "@ha/authstore";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {CustomizerReducer} from '@ha/apptheme'
import {CommonStoreReducer} from '@ha/common'

export interface AppStateInterface{
        isLoading:boolean,
        currentRole:string|null
}

const initialState:AppStateInterface={isLoading:false,currentRole:null}
export const appSlice=createSlice({
     name:'app',
     initialState,
     reducers:{
         setLoading:(state,p:PayloadAction<boolean>)=>({...state,isLoading:p.payload}),
         setCurrentRole:(state,p)=>({...state,currentRole:p.payload})
     }
})

export const AppStore=configureStore({
    reducer:{
        app:appSlice.reducer, 
        'auth':AuthStoreReducer,
        'common': CommonStoreReducer,
         CustomizerReducer,
    }
})


export type AppState=ReturnType<typeof AppStore.getState>

export const {setLoading,setCurrentRole} = appSlice.actions

