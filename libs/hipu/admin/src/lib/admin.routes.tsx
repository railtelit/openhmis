
import { Box } from '@mui/material'
import React, { Suspense } from 'react'
import {Navigate, Outlet, RouteObject} from 'react-router-dom'
import { AdminDashboard } from '../views/admin-dashboard/admin-dashboard'

const SetupOrg=React.lazy(()=> import('../views/setup-org/setup-org'))
const SetupLocations=React.lazy(()=> import('../views/setup-location/setup-location'))
const ManageWorker=React.lazy(()=>import('../views/manage-worker/manage-worker'))
const ManagePractitioner=React.lazy(()=>import('../views/manage-practitioner/manage-practitioner'))
const WithSuspense=(element:any)=><Suspense fallback={'Loading...'} >{element}</Suspense>

export const adminRoutes:RouteObject[] =[
        {
            path:'/',  element:<AdminDashboard/>,
            children:[                
            ]
        },
        {
            path:'setup-org',element:<SetupOrg/>
        },
        {
            path:'setup-locations',element:<SetupLocations/>
        },
        {
            path:'manage-worker',element:<ManageWorker/>
        },
        {
            path:'manage-practitioner',element:<ManagePractitioner/>
        }
    ]
