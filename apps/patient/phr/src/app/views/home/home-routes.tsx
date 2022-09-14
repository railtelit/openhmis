import React, { Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ManageProfile from "./manage-profile/manage-profile";

const UserDashboard = React.lazy(()=>import('./userdashboard/userdashboard'))
const ProfileSettings = React.lazy(()=>import('./manage-profile/manage-profile'))
const Qrcode = React.lazy(()=>import('./qrcode/qrcode'))
export const HOME_ROUTES:RouteObject[]=[   
   {
         path:'/',element:<Navigate to={'dashboard'}  />
   },
    {
           path:'dashboard', element:<Suspense fallback={'Loading..'}> <UserDashboard/> </Suspense>     
    },
    {
       path:'profile',index:true,element:<Suspense fallback={'Loading..'}> <ManageProfile/></Suspense>     
    },
    {
       path:'qrcode',index:true,element:<Suspense fallback={'Loading..'}> <Qrcode /> </Suspense>     
    }
]