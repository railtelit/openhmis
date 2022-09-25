import { authSlice, AuthStoreReducer } from '@ha/authstore'
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CustomizerReducer} from "@ha/apptheme";

export interface AppStateInterface{
        isReady:boolean
}
const initialState:AppStateInterface={isReady:false}



const appSlice=createSlice({
    name:'appstate',
    initialState,
    reducers:{
        setRead:(state,action:PayloadAction<boolean>)=>({...state,isReady:action.payload})
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