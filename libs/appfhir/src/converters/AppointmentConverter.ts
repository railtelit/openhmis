import { FhirConverter } from "../hooks/useFhirConverter";
import { DEFAULT_SYSTEM } from "../fhir.config"
import { FhirService } from "../fhir-service";
import { Appointment, Patient, Practitioner, Reference } from "fhir/r4";

export class AppointmentConverter implements FhirConverter{
  toResource(form: any){
         //
         // console.log('Converting');
         console.log("form "+form)
         const {id,appointmentStatus,status,start,end,participant,patient,doctor,serviceCategory,specialty,appointmentType,description,participantReference}= form||{}
         return {
          id,appointmentStatus,start,end,participantReference,
            participant:[
              {
                actor:patient
              },{
                actor: doctor
              }
            ],
            status:status?.[0]?.coding,
            // serviceCategory:[
            //   {
            //     coding:[
            //       {
            //         display: category
            //       }
            //     ]
            //   }
            // ],
            serviceCategory,
            // specialty:[
            //   {
            //     coding:[
            //       {
            //         display: specialty
            //       }
            //     ]
            //   }
            // ],
            specialty,
            patient,
            appointmentType,
            // appointmentType:
            //   {
            //     coding:[
            //       {
            //         display: appointmentType
            //       }
            //     ]
            //   },
            description
         }
  }
  toForm(resource: any){
     const {id,appointmentStatus,start,end,participant,status,serviceCategory,specialty,appointmentType,description,participantReference,patient,doctor}=resource||{}
     if(resource){
         return {
          id,appointmentStatus,start,end,
          //participant:resource['participant'][0]?.actor.display,
          //category:resource['serviceCategory'][0]?.coding[0]?.display,
          serviceCategory,
          status,
          specialty,
          //specialty:resource['specialty'][0]?.coding[0]?.display,
          appointmentType,
          // appointmentType:resource['appointmentType'].coding[0]?.display,
          description,
          //participantReference:resource['participant'][0]?.actor.reference,
         patient : (resource as Appointment).participant?.find( p => p.actor?.reference?.startsWith('Patient') )?.actor,
         doctor : (resource as Appointment).participant?.find( p => p.actor?.reference?.startsWith('Practitioner') )?.actor,
        }
     }
     return {}
  }
};

