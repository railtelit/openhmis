import { Encounter, Observation } from "fhir/r4";
import { useFhirQuery } from "./useFhirQuery";



const useFhirVitalController = (e:Encounter)=>{
        const [vitals,setVitals]=useFhirQuery<Observation>('Observation');
        return null
}

export default useFhirVitalController; 