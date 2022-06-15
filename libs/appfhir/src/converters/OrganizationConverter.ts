

import {FhirConverter} from '../hooks/useFhirConverter'
import {DEFAULT_SYSTEM, ORGANIZATION_SYSTEM} from '../fhir.config'
import { FhirService } from '../fhir-service'
export class OrganizationConverter  implements FhirConverter{
        CONSTANT_FIELDS=['active','name','alias']
        setConstants(source:any,target:any){
                this.CONSTANT_FIELDS.forEach(f=> {
                        target[f]=source[f]
                } )
                return target
        }
        toResource(form: any){
                const resource:any=form
                console.log(`ConV Resource`,form,)
                 
                       form.type && (resource.type = [{                                
                                        coding:[{
                                                code:form.type, system:ORGANIZATION_SYSTEM
                                        }]  
                                 }
                                 ]
                                )
                    
                        form.id && (
                            resource.identifier=[{type:[
                                    {coding:[{system:DEFAULT_SYSTEM,...form.id }]}
                            ]}]
                        ); 
                        form.mobileno && (
                                resource.telecom = [ {system:'phone',use:'mobile',value:form.mobileno}]
                        )
                        form.address && (
                                resource.address = (form.address as any[]).map(a=>({...a,line:[a.line1,a.line2]}))
                        )
                        form.partOf && (
                                resource.partOf =  form.partOf
                        )
                    return resource; 
        }
        toForm(resource:any={}){
                const form = {...resource}
                return {...form,
                                /// id:FhirService.resolve('identifier.0.type.coding',resource), 
                        mobileno:FhirService.resolve('telecome.0.value',resource),
                        address:(FhirService.resolve('address',resource)||[] ).map( (a:any)=>({...a,line1:a?.line[0],line2:a.line[1] }))
                }
        }
}