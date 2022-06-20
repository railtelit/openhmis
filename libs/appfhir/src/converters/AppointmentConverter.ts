import { FhirConverter } from "../hooks/useFhirConverter";
import { DEFAULT_SYSTEM } from "../fhir.config"

export class AppointmentConverter implements FhirConverter{
  toResource(form: any){
         //
         // console.log('Converting');
         console.log("form "+form)
         const {id,status,start,end,participant,category,specialty,appointmentType,description,participantReference}= form||{}
         return {
          id,status,start,end,
            participant:[
              {
                actor:{
                  display: form['participant']
                }
              }
            ],
            serviceCategory:[
              {
                coding:[
                  {
                    display: form['category']
                  }
                ]
              }
            ],
            specialty:[
              {
                coding:[
                  {
                    display: form['specialty']
                  }
                ]
              }
            ],
            appointmentType:
              {
                coding:[
                  {
                    display: form['appointmentType']
                  }
                ]
              },
            description,
            participantReference:[
              {
                actor:{
                  reference: form['participantReference']
                }
              }
            ],
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
          description,participantReference:resource['participant'][0]?.actor.reference
         }
     }
     return {}
  }
};

// export class AppointmentConverter implements FhirConverter{
//      SNOMED_FIELDS:string[]=['serviceCategory','serviceType','speciality','appointmentType','reasonCode','note'];
//     //  CONSTANT_FIELDS:string[]=['start','end','status','description','priority','created','comment','patientInstruction']
//     CONSTANT_FIELDS:string[]=['note','patientInstruction','institution','impatientRegistration','patient','start','end','visit','urgency','type','status','healthProf','speciality','information']

//     readonly resourceType='Appointment'
//     toResource(form:any={}){
//             const resource:any  = {participant:[]};
//             const {start,end,status,description,priority,created,comment,patientInstruction}=form
//             this.SNOMED_FIELDS.forEach(f=>{
//                 const value=form[f]; // Should be {code,system,display}

//                 value && Object.assign(resource, {[f]:
//                     [{ coding:[{
//                             code:value
//                         }] }]
//                     }
//                 )
//             });
//             if(form.patient)
//             resource.participant=[...resource.participant,{
//                     actor:{ reference: form.patient,display:form.patient },
//                     status:'accepted'
//             }]
//             return { resourceType:this.resourceType,start,end,status,description,priority,created,comment,patientInstruction,
//                      ...resource};
//     }

//     toForm(resource:any={}){
//            //
//           const formValue={};
//            this.CONSTANT_FIELDS.forEach(f=>Object.assign(formValue,resource[f]));
//            this.SNOMED_FIELDS.forEach(f=>{
//                if(resource[f]?.codes?.length>0){
//                     const coding = resource[f].code[0];
//                     Object.assign(formValue,coding )
//                }
//            })
//           return formValue;
//     }

// }
