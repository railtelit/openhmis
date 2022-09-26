import { RouteObject } from "react-router-dom";
import AdminHome from "./views/admin-home/admin-home";



export const appRoutes:RouteObject[]=[
    {path:'/',index:true,element:<AdminHome/> }
]