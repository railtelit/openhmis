
export interface HomeRoute{
            label:string, icon?:string,path?:string,divider?:boolean
}

export const HOME_ROUTES:HomeRoute[]=[
    {label:'Appointments',icon:'list',path:'health/appointments'},
    {label:'Patients',icon:'person',path:'health/patients'},
    {label:'Organizations',icon:'corporate_fare',path:'health/organizations'},
    {label:'Configure',icon:'settings',path:'configure',divider:true},
]