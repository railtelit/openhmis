import { AuthStoreReducer } from "@ha/authstore";
import { configureStore } from "@reduxjs/toolkit";

import {CustomizerReducer} from '@ha/apptheme'




export const AppStore=configureStore({
    reducer:{
        'auth':AuthStoreReducer,
         CustomizerReducer
    }
})


export type AppState=ReturnType<typeof AppStore.getState>