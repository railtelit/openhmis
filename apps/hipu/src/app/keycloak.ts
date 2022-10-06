import KC from "keycloak-js"
import { environment } from "../environments/environment"

export const KeycloakSecurity=new KC({clientId:'react-app',realm:'openhmis-app',url:environment.KEYCLOAK_URL});

