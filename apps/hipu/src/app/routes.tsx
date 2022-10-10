import React, { Suspense } from "react";
import { Route, RouteObject, Routes } from "react-router-dom";
import { AppPaths } from "./security";
import AppHome from "./views/app-home/app-home";
import Forbidden from "./views/forbidden/forbidden";
import Logout from "./views/logout/logout";
import SelectRole from "./views/select-role/select-role";

function withSuspense(Component:any){
        return <Suspense fallback={'Loading...'}>
                <Routes>
                        <Route path="/*" element={<Component/>} />
                </Routes>               
        </Suspense>
}

const roleMappings={
    'admin':AppPaths.admin,'service_admin':AppPaths.admin,
}
const Admin =  withSuspense(React.lazy( ()=>import('@ha/hipu/admin') ))
const RoleViews= {
      Admin:  withSuspense(React.lazy( ()=>import('@ha/hipu/admin') ) ),
      Helpdesk:  withSuspense(React.lazy( ()=>import('@ha/hipu/helpdesk') ) ),
}

export const AppRoutes:RouteObject[]=[
    {
        path:'/', element:<AppHome/>,
        children:[
                        {
                    path:'/logout',element:<Logout/>
                },
                {
                    path:'/selectrole',element:<SelectRole />
                },
                {
                    path:'/404',element:<Forbidden/>
                },
                {
                    path:`${AppPaths.admin}/*`,element:RoleViews.Admin 
                },
                {
                    path:`${AppPaths.receptionist}/*`, element:RoleViews.Helpdesk
                }
        ]
    },
   
]