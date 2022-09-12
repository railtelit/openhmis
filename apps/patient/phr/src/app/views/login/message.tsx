import { useSelector } from "react-redux"
import { AppState } from "../../store/app.store"



export function LoginMessage(){ 
    const astate=useSelector((state:AppState)=>state.auth)
    return <div>
            State : {astate.step}
    </div>
}