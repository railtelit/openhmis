import { Autocomplete, TextField } from '@mui/material';
import  Axios  from 'axios';
import { CodeableConcept, CodeSystem } from 'fhir/r4';
import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CODESYSTEM_URL } from '../../fhir.config';
import styles from './code-autocomplete.module.scss';

/* eslint-disable-next-line */
export interface CodeAutocompleteProps {
      system?:string, 
      name:string,
      label?:string,
      resourceId:string,
      control:Control,
      multiple?:boolean,
      defaultValue?:any,
      onValueChange?:(v:any)=>void
}

export function CodeAutocomplete({system,resourceId,multiple=false,control,name,onValueChange,defaultValue,label}: CodeAutocompleteProps) {
  const [options,setOptions]=useState<CodeableConcept[]>([]);
  const [init,setInit]=useState(false)
  useEffect(()=>{
      // Load 
      Axios.get(CODESYSTEM_URL+`CodeSystem/${resourceId}`).then(result=>{
          // Convert To CodeableConcept Type 
          const codeSystem  = result.data as CodeSystem; 
          const valueMapping = codeSystem?.concept?.map(item=>  ({ text:item.display, coding:[ {...item}  ] } as CodeableConcept)  ); 
          console.log(valueMapping);
          setOptions(valueMapping||[]);
          setInit(true)
      })
  },[])
  return (
    <div className={styles['container']}>
       
      <Controller control={control} name={name}    defaultValue={defaultValue} 
               render={ ( {field :{onChange,ref,value,} } )=>
                  <Autocomplete multiple={multiple}  value={value}  options={options} getOptionLabel={(o)=>o?.text || '-' } 
                     
                    isOptionEqualToValue={ (option,value)=> option?.coding?.[0]?.code === value?.coding?.[0]?.code  }
                    onChange={(e,value)=> { 
                      onChange(value); 
                      onValueChange && onValueChange(value);
                     }  } 
                    renderInput={(params)=> <TextField label={label} 
                                onClick={()=> onValueChange && onValueChange(null)  } {...params} /> } />
               }
       />
 
       
    </div>
  );
}

export default CodeAutocomplete;
