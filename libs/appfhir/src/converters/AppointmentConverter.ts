import { FhirConverter } from "../hooks/useFhirConverter";

export class AppointmentConverter implements FhirConverter{
     SNOMED_FIELDS:string[]=['serviceCategory','serviceType','speciality','appointmentType','reasonCode']; 
     CONSTANT_FIELDS:string[]=['start','end','status','description','priority','created','comment','patientInstruction']
    readonly resourceType='Appointment'
    toResource(form:any={}){
            const resource  = {}; 
            const {start,end,status,description,priority,created,comment,patientInstruction}=form
            this.SNOMED_FIELDS.forEach(f=>{
                const value=form[f]; // Should be {code,system,display}
                Object.assign(resource,[{ coding:[{
                    code:value
                }] }])
            });

            return { resourceType:this.resourceType,start,end,status,description,priority,created,comment,patientInstruction,
                     ...resource}; 
    }

    toForm(resource:any={}){
           //            
          const formValue={}; 
           this.CONSTANT_FIELDS.forEach(f=>Object.assign(formValue,resource[f])); 
           this.SNOMED_FIELDS.forEach(f=>{
               if(resource[f]?.codes?.length>0){
                    const coding = resource[f].code[0];
                    Object.assign(formValue,coding )
               }
           })
          return formValue; 
    }

}