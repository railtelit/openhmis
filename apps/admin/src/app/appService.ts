import { useSelector } from "react-redux"
import { AppState } from "./store/app.store"



export const useAppService=()=>{
    //
    const appState=useSelector<AppState>( (state)=>state.appstate )

}