import { FhirConverter } from "../hooks/useFhirConverter";



export class LocationConverter  implements  FhirConverter{
         CONSTANT_FIELDS=['status','name','alias','description','mode']
         toResource (form: any){
                return {...form,telecom: form.mobileno?[{system:'mobile',use:'work',value:form.mobileno}]: []}
         }
         toForm(resource: any) {
             return {...resource,mobileno:resource?.telecom?.length>0?resource.telecom[0]['value']:null}
         }
}