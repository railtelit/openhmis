 

export const AppPaths={
    admin:'/admin',receptionist:'/helpdesk',doctor:'/doctor',nurse:'/nurse'
}
export interface RoleSetting{
        path:string
}

export const AppRoles:Record<string,RoleSetting>={
    'service-admin':{path:AppPaths.admin},'HIP':{path:AppPaths.admin},
    receptionist:{path:AppPaths.receptionist},
    doctor:{path:AppPaths.doctor},nurse:{path:AppPaths.nurse}
}

export const RoleMaster:string[]=
            ['service-admin','admin','receptionist',
                'doctor','nurse' ]