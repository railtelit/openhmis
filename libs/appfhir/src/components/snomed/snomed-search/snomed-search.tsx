import styles from './snomed-search.module.scss';
import {  SNOMEDQueryType, useSNOMEDQuery} from '../../../hooks/useSNOMEDQuery'
import {Autocomplete,TextField} from '@mui/material'
import { Control, Controller } from 'react-hook-form';
import { CodeableConcept } from 'fhir/r4';
 

/* eslint-disable-next-line */
export interface SnomedSearchProps  {
     semanticTag?:string,
     control:Control,
     name:string,
     disabled?:boolean, placeholder?:string, 
     onChange?:(value:any)=>void,
     ecl?:string,
     module?:string,      
     multiple?:boolean,
     searchMode?:string,
     queryConfig?:SNOMEDQueryType,
     required?:boolean,
     label?:string
}

export function SnomedAutoComplete(props: SnomedSearchProps) {
  const {snomedresults,searchDescriptions}=useSNOMEDQuery(props.queryConfig); 
 
  return (
    <Controller name={props.name}
         control={props.control} 
         rules={{required:props.required || false }}
         render={
           ({field:{value,onChange}})=> 
           <Autocomplete options={snomedresults} fullWidth      value={value}     
            autoHighlight    autoSelect  freeSolo={true}         multiple={props.multiple||false}         
              disabled={props.disabled||false}
             onChange={(e,v,reason,details)=>{                  
                  onChange(v); 
                  props.onChange && props.onChange(v);
             }}
             onInputChange={(t,value)=> {
                   if(t.type==='change')
                      searchDescriptions({term:value as string,semanticTag:props.semanticTag,
                         active:true,conceptActive:true,ecl:props.ecl,module:props.module
                      });
                  }
                 } 
            isOptionEqualToValue={ (o:CodeableConcept,v:CodeableConcept)=> (o.coding?.[0]?.code || o?.text )  === (v?.coding?.[0]?.code || v?.text )  }
           getOptionLabel={(o :any )=> (  (o).text   ) } 
           renderInput={(field)=> <TextField  label={props.label} variant={'filled'} placeholder={props.placeholder} {...field} /> }  /> 
         }
      />    
  );
}

export default SnomedAutoComplete;
