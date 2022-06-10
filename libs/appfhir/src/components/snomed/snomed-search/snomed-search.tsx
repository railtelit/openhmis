import styles from './snomed-search.module.scss';
import {SearchParams, useSNOMEDQuery} from '../../../hooks/useSNOMEDQuery'
import {Autocomplete,TextField} from '@mui/material'
import { Control, Controller } from 'react-hook-form';
/* eslint-disable-next-line */
export interface SnomedSearchProps  {
     semanticTag?:string,
     control:Control,
     name:string,
     onChange?:(value:any)=>void
}

export function SnomedAutoComplete(props: SnomedSearchProps) {
  const {snomedresults,searchDescriptions}=useSNOMEDQuery(); 
  
  return (
    <Controller name={props.name}
         control={props.control} 
         rules={{required:true}}
         render={
           ({field:{value,onChange}})=> 
           <Autocomplete options={snomedresults} fullWidth
            autoHighlight                        
             freeSolo={true} 
             onChange={(e,v,reason,details)=>{                  
                  onChange(v); 
                  props.onChange && props.onChange(v);
             }}
             onInputChange={(t,value)=> {
                   if(t.type==='change')
                      searchDescriptions({term:value as string,semanticTag:props.semanticTag,
                      active:true,conceptActive:true                   
                      });
                  }
                 } 
            isOptionEqualToValue={ (o,v)=> o.id ? o.id===v.id : true }
           getOptionLabel={(o:any)=> ( o.pt? o?.pt?.term : o ) } 
           renderInput={(field)=> <TextField  {...field} /> }  /> 
         }
      />
    
  );
}

export default SnomedAutoComplete;
