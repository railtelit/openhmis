import React, { Suspense } from "react";
import { Route, RouteObject, Routes } from "react-router-dom";
// import Home from "./views/home/home";
import Login from "./views/login/login";
import Register from "./views/register/register";
const Home=React.lazy(()=>import('./views/home/home'))
export const APP_ROUTES:RouteObject[]=[
                
        {
        path:'/login',element:<Login></Login>,
}, 
{
        path:'/register',element:<Register></Register>,
},
{
        path:'/account/*',element:<Suspense fallback={'Loading...'} >
                <Routes>
                        <Route path="/*" element={<Home/>} ></Route>
                </Routes>
        </Suspense>,        
}
]