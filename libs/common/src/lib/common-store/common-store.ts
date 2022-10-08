import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export const commonStore=createSlice({
    name:'common',
    initialState:{},
    reducers:{
        setState:((state,action:PayloadAction<any> )=>({...state, 
                    ...action.payload 
        }))
    }
})


export const  CommonStoreReducer  =  commonStore.reducer


export const  {setState}  = commonStore.actions