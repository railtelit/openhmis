import { useCallback, useState } from "react"
import { DEFAULT_SYSTEM } from "../fhir.config"

export interface FhirConverter{
        toResource:(form:any)=>any
        toForm:(resource:any)=>any
}
type ResourceConvert = 'Patient'|'Appointment'

export class PatientConverter implements FhirConverter{
     toResource(form: any){
            //
            // console.log('Converting'); 
            // console.log(form)
            return {...form, 
                name:[
                    {family: form['name']}
                ],
                address:(form['address'] as any[]).map(
                    a=>({ ...a, line:[ a.line1,a.line2 ]})
                ),
                identifier:[
                    form?.uid? {system:DEFAULT_SYSTEM,value:form?.uid }:{}
                ]
            }
     }
     toForm(resource: any){
         //
     }
}; 

export const converters:Record<ResourceConvert,FhirConverter>={
    'Patient':new PatientConverter(),
    'Appointment':new PatientConverter()
}

export const useFhirConverter=(resourceType:ResourceConvert):{ 
        convertToResource: (form:any)=>any,
        convertToForm:(res:any)=>any,
        result:any
    }=>{
    const converter=converters[resourceType];
    const [result,setResult]=useState(); 

    const convertToResource=(form:any)=>{
            const val = (converter.toResource(form)); 
             
            setResult(val)
            return val;
    }
    const convertToForm=useCallback((res:any)=>{
            setResult(converter.toForm(res));
             return result;
    },[])

    return {convertToResource,convertToForm,result}
}