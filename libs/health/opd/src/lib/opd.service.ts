import { FhirService, useFhirCreate, useFhirQuery, useFhirResource } from "@ha/appfhir";
import  Axios  from "axios";
import dayjs from "dayjs";
import { Encounter, Organization, Patient, Practitioner, Reference,Coding,Account, EpisodeOfCare } from "fhir/r4";


export interface CreateOPDRequest{
        patient:Patient,practitioner:Practitioner,serviceProvider?:Reference,date?:Date,startTime?:string|null
}
export interface OpdServiceInterface{
         createNewEncounter:(request:CreateOPDRequest)=>Promise<Encounter|null|undefined>
}
// Service to Manage OPD 
// 1. Check Episode Of Care 2. Check Account 
export const useOPDService=():OpdServiceInterface=>{
         const [encounter,createError,create]=useFhirCreate<Encounter>('Encounter'); 
         const [pataccount,accerror,getaccount,deleteaccount,createaccount]=useFhirQuery<Account>('Account'); 
         const [episode,episodeerror,getepisode,deleteepisode,createpisode]=useFhirQuery<EpisodeOfCare>('EpisodeOfCare')

         async function getPatientAccount(id:any){
                return getaccount({patient:id})
         }
         async function getPatientEpisode(id:any){
                return getepisode({patient:id,status:'active'})
         }

         async function createNewEncounter(request:CreateOPDRequest):Promise<Encounter|null>{            
             //const e = await create({}); 
             const patRef=FhirService.toReference(request.patient);
             const accounts = await  getPatientAccount(request.patient.id||0);
             let account = accounts ? accounts[0] :null; 
             if(accounts && accounts.length===0){
                    account = await createaccount({subject:[patRef],status:'active', resourceType:'Account',
                         type:FhirService.createCodeableConcept('PBILLACCT', FhirService.getName(request.patient?.name?.[0]) ) } as Account)
             }
             // Check Episode
             const epis = await getPatientEpisode(request.patient.id||0); 
             let episode = epis?epis[0]:null
             if(epis && epis.length===0){
                     episode = await createpisode({resourceType:'EpisodeOfCare',status:'active',patient:patRef} as EpisodeOfCare)
             }

             const period = {start: dayjs(request.date+' '+request.startTime).toISOString()}
             const status = 'arrived';
             const encounterClass:Coding= {  code:'AMB',display:'OPD'  }
             const newEntry:Encounter={...request, resourceType:'Encounter',
                      period ,subject: FhirService.toReference(request.patient,FhirService.getName(request.patient?.name?.[0]) +'('+request.patient?.gender+')' ),
                            status,class:encounterClass, account: account?[ FhirService.toReference(account) ]:[],
                            episodeOfCare:episode? [FhirService.toReference(episode)] :[],
                            serviceProvider:request.serviceProvider,
                            participant:[  { individual: FhirService.toReference( request.practitioner , 
                                FhirService.getName(request.practitioner?.name?.[0],request.practitioner?.id) ) } ] }  ;
                    console.log('Creating Encounter ',newEntry)
                 
                  return create(newEntry);
                  //  return null; 
         }
         return {createNewEncounter}
}