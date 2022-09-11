import { RouteObject } from "react-router-dom";
import Login from "./views/login/login";
import Register from "./views/register/register";

export const APP_ROUTES:RouteObject[]=[
                
        {
        path:'/login',element:<Login></Login>,
}, {
        path:'/register',element:<Register></Register>,
}
]