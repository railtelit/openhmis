import { useContext } from "react"
import { KeycloakContext } from "./keycloak.context"

export const useKeycloak=()=>{
        const kc = useContext(KeycloakContext) ;
                           
        return kc
}