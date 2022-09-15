import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CustomizerReducer} from "@ha/apptheme";

export interface AuthState{
        healthId?:string,
        txnId?:string,
        step:number,
        verifyToken?:string,
        userToken?:string|null,
        userAccount?:any,
        qrCode?:any 
}
export interface AppStoreState{
            isLoading:boolean
}
const initialAppState:AppStoreState={isLoading:false,
           } ; 

const initialState:AuthState={step:0,  userToken:localStorage.getItem('token')?localStorage.getItem('token'):null }

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
               if(action.payload.token)
                  localStorage.setItem('token', (action.payload.token ) );
                return ({...state,userToken:action.payload.token })
          },          
          nextStep:(state,action)=>({...state,step:state.step+1}),
          onProfileError:(state)=>({...state,userAccount:null,userToken:null}),
          onProfileLoad:( (state,action:PayloadAction<any>)=>({...state,userAccount:action.payload })),
          onQrcode:((state,action)=>({...state,qrCode:action.payload})),
          onLogout:((state)=>({...state,userAccount:null,userToken:null}))
    }
});

const appSlice = createSlice({
            name:'app',
            initialState:initialAppState,
            reducers:{
                  setLoading:(state,action:PayloadAction<boolean>)=>({...state,isLoading:action.payload})
            }
})

export const appStore = configureStore({
    reducer:{
         app:appSlice.reducer,
         auth:authSlice.reducer,
         CustomizerReducer
    },
}); 

export const {onVerifyOtpTransaction,ongenerateotptransaction,
            onuserAuthorizedToken,nextStep,onProfileError,onProfileLoad,onLogout,onQrcode} = authSlice.actions
export const {setLoading}  = appSlice.actions;
export type AppState = ReturnType<typeof appStore.getState>; 

export type AppDispatch = typeof appStore.dispatch