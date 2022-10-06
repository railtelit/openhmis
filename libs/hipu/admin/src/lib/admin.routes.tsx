
import {Navigate, RouteObject} from 'react-router-dom'
import { AdminDashboard } from '../views/admin-dashboard/admin-dashboard'

export const adminRoutes:RouteObject[] =[
        {
            path:'/',  
            children:[
                {
                    path:'/dashboard',element:<AdminDashboard />,
                }
            ]
        }
]
