
import { Box } from '@mui/material'
import React, { Suspense } from 'react'
import {Navigate, Outlet, RouteObject} from 'react-router-dom'
import { AdminDashboard } from '../views/admin-dashboard/admin-dashboard'

const SetupOrg=React.lazy(()=> import('../views/setup-org/setup-org'))
const SetupLocations=React.lazy(()=> import('../views/setup-location/setup-location'))

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
        }
    ]
