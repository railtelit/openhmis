import  * as SMART  from 'fhirclient'; 
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

}
