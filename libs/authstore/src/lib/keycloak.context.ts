import { createContext } from "react";
import {KeycloakInstance}  from 'keycloak-js'
export const KeycloakContext=createContext<KeycloakInstance|null>(null)
