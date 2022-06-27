import { FhirConverter } from "../hooks/useFhirConverter";
import { DEFAULT_SYSTEM } from "../fhir.config"

export class AppointmentConverter implements FhirConverter{
  toResource(form: any){
         //
         // console.log('Converting');
         console.log("form "+form)
         const {id,status,start,end,participant,category,specialty,appointmentType,description,participantReference}= form||{}
         return {
          id,status,start,end,participantReference,
            participant:[
              {
                actor:{
                  reference: participantReference,
                  display: participant
                }
              }
            ],
            serviceCategory:[
              {
                coding:[
                  {
                    display: category
                  }
                ]
              }
            ],
            specialty:[
              {
                coding:[
                  {
                    display: specialty
                  }
                ]
              }
            ],
            appointmentType:
              {
                coding:[
                  {
                    display: appointmentType
                  }
                ]
              },
            description
         }
  }
  toForm(resource: any){
     const {id,status,start,end,participant,category,specialty,appointmentType,description,participantReference}=resource||{}
     if(resource){
         return {
          id,status,start,end,participant:resource['participant'][0]?.actor.display,
          category:resource['serviceCategory'][0]?.coding[0]?.display,
          specialty:resource['specialty'][0]?.coding[0]?.display,
          appointmentType:resource['appointmentType'].coding[0]?.display,
          description,
          participantReference:resource['participant'][0]?.actor.reference
         }
     }
     return {}
  }
};

