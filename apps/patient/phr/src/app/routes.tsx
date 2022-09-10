import { RouteObject } from "react-router-dom";
import Login from "./views/login/login";

export const APP_ROUTES:RouteObject[]=[
                
        {
        path:'/login',element:<Login></Login>,
}, {
        path:'/register',element:<Login></Login>,
}
]