import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import AdminHome from "./views/admin-home/admin-home";
//import ManageAdmin from "./views/manage-admin/manage-admin";

const ManageAdmin=React.lazy(()=>import('../app/views/manage-admin/manage-admin'))

export const appRoutes:RouteObject[]=[
    {path:'/',index:true,element:<AdminHome/> },
    {path:'/manage-admin',index:true,element: <Suspense fallback={'Loading...'}>
            <ManageAdmin />
    </Suspense> },
]