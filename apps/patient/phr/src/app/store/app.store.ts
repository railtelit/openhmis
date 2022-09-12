import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CustomizerReducer} from "@ha/apptheme";

export interface AuthState{
        healthId?:string,
        txnId?:string,
        step:number,
        verifyToken?:string,
        userToken?:string,
        
}
const initialState:AuthState={step:0}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
          ongenerateotptransaction:(state, action:PayloadAction<string>)=>({...state,txnId:action.payload}),
          onVerifyOtpTransaction:(state,action)=>{
                //
                return ({...state,...action.payload})
          },
          onuserAuthorizedToken:(state,action)=>{
                return ({...state,userToken:action.payload.token})
          },
          nextStep:(state,action)=>({...state,step:state.step+1})
    }
});

export const appStore = configureStore({
    reducer:{
         auth:authSlice.reducer,
         CustomizerReducer
    },
}); 

export const {onVerifyOtpTransaction,ongenerateotptransaction,onuserAuthorizedToken,nextStep} = authSlice.actions

export type AppState = ReturnType<typeof appStore.getState>; 

export type AppDispatch = typeof appStore.dispatch