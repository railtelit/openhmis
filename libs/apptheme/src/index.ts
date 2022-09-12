import  CR from './redux/customizer/CustomizerReducer' 
import { configureStore } from './redux/Store'

export const CustomizerReducer=CR
export const configStore=configureStore(); 
export * from './lib/theme-provider'
