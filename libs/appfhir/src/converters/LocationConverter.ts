import { FhirConverter } from "../hooks/useFhirConverter";



export class LocationConverter  implements  FhirConverter{
         CONSTANT_FIELDS=['status','name','alias','description','mode']
         toResource (form: any){
                return form
         }
         toForm(resource: any) {
             return resource
         }
}