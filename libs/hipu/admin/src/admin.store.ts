import { configureStore, createSlice } from "@reduxjs/toolkit";
 
import {CommonStoreReducer} from '@ha/common'
import { createContext } from "react";
import { ReactReduxContextValue } from "react-redux";


export const adminContext = createContext<ReactReduxContextValue<any,any>>({
                            
                        }as any)

export const adminSlice=createSlice({
     name:'admin',
     initialState:{state:{}},
     reducers:{
          
     }
})


export const adminStore = configureStore({
    reducer:{
         'common':CommonStoreReducer
    }
})

export type AdminState = ReturnType<typeof adminStore.getState >