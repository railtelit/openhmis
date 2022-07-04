import { CodeableConcept, DomainResource, HumanName, Reference, Resource } from 'fhir/r4';
import  * as SMART  from 'fhirclient'; 
import { ResourceName } from './components/resourceviews/resourceviews';
import { SERVER_URL } from './fhir.config';

export const  FhirClient = SMART.client({serverUrl:SERVER_URL})
export class FhirService{        
        
        static createQuery(request:any){
                const query = new URLSearchParams(); 
                Object.keys(request).forEach( (key:string) =>{
                        query.set(key,request[key]||'')
                });
                return query;
        }

        static resolve(path:string,otherResource:any){
                return path.split('.').reduce(function(prev, curr) {
                        return prev ? prev[curr] : null
                    }, ( otherResource) || window.self)
        }

        static getName(name?:HumanName,defaultText=''):string{
                return  name ? `${name?.prefix?.join(' ')||''}${name?.family} ${name?.given?.join(' ')||''}` : defaultText
        }

        static toReference(resource:Resource|DomainResource,display?:string):Reference{
                         return { display , reference:`${resource.resourceType}/${resource.id}`};
        }

        static createCodeableConcept(code:string,text:string,system?:string):CodeableConcept{
                        return {text,coding:[{code,display:text,system}]}
        }
}
