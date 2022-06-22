
export interface HomeRoute{
            label:string, icon?:string,path?:string,divider?:boolean
}

export const HOME_ROUTES:HomeRoute[]=[
    {label:'Patients',icon:'people',path:'health/patients'},
    {label:'OPD',icon:'medical_services',path:'health/opd'},
    {label:'Appointments',icon:'list',path:'health/appointments'},
    {label:'Health Practioners',icon:'account_circle',path:'health/practitioners'},
    {label:'Organizations',icon:'corporate_fare',path:'health/organizations'},
    {label:'Configure',icon:'settings',path:'configure',divider:true},
]