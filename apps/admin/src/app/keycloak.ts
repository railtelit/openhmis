
import KC from 'keycloak-js'
import { environment } from '../environments/environment';

export const KeyCloak=new KC({clientId:environment.KC_CLIENT_ID,realm:environment.KC_REALM,url:environment.KC_URL,
            });