import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState, onLogout, onProfileError, onProfileLoad } from "../store/app.store";
import { QUERIES_URL } from "./queries";
import { useApiService } from "./useApiService"


export const useAccountService=()=>{
        const apiService=useApiService();
        const authState=useSelector((state:AppState)=>state.auth); 
        const storedispatch=useDispatch(); 
        const navigate=useNavigate()
        async function loadProfile(){
                //
                // X-Token
                const token = authState.userToken; 
                try{
                   // console.log('Xtoken',token)
                    const result = (await apiService.query(QUERIES_URL.LOAD_PROFILE,{},{"X-Token":`Bearer ${token}`})).data; 
                    storedispatch(onProfileLoad(result))
                }catch(err){                    
                    //
                    localStorage.removeItem('token');
                    storedispatch(onProfileError());
                    navigate('/login');
                }                
        }
        async function loadQrcode(){
                try{
                         const result = (await apiService.query(
                                        QUERIES_URL.LOAD_QRCODE,{},
                                        {"X-Token":`Bearer ${authState.userToken}`})).data
                         //console.log( typeof result );
                         return result
                }catch(err){
                        //
                }
        }
        async function logout(){
                localStorage.removeItem('token'); 
                storedispatch(onLogout());
                navigate('/login')
        }
        return {loadProfile,loadQrcode, logout}
}