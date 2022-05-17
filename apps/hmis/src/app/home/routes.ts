
export interface HomeRoute{
            label:string, icon?:string,path?:string
}

export const HOME_ROUTES:HomeRoute[]=[
    {label:'Appointments',icon:'list',path:'health/appointments'},
    {label:'Patients',icon:'person',path:'health/patients'},
]