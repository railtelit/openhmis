import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { display } from '@mui/system';
import { Reference } from 'fhir/r4';
import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useFhirQuery } from '../../hooks/useFhirQuery';
import styles from './resourceref-autocomplete.module.scss';

/* eslint-disable-next-line */
export interface ResourcerefAutocompleteProps  {
       resourceType:string,
       control:Control,
       name:string,
       onChange?:(value:any)=>void,
       params?:any,
       label?:string, placeholder?:string,
       getOptionLabel:(row:any)=> any,
       defaultValue?:any,
       multiple?:boolean
}

export function ResourcerefAutocomplete(props: ResourcerefAutocompleteProps ) {
  const [resourcelist,loaderror,getresources]=useFhirQuery(props.resourceType);
  const [refoptions,setrefoptions]=useState<Reference[]>([])
  useEffect(()=>{
      getresources(props.params||{}).then( (results) =>{
          const options:Reference[] = (results as any[]).map(r=>
                ({ display:props.getOptionLabel(r),reference:`${props.resourceType}/${r.id}`
                })
              );
          setrefoptions(options);
      } );
  },[]);


  return (
    <div className={styles['container']}>
         <Controller control={props.control} defaultValue={props.defaultValue||null}  name={props.name}
              render={({field:{value,onChange}})=>
              <Autocomplete value={value} multiple={props.multiple||false} fullWidth onChange={(e,value)=>{
                //console.log('ACV',value)
                onChange(value);
                props.onChange && props.onChange(value)
              }} autoHighlight autoSelect   options={refoptions}
                isOptionEqualToValue={(o,v)=>{   return (o.reference||'') === (v.reference||'') } }
                getOptionLabel={(option:Reference)=> option.display||
                       (refoptions.find(r=>r.reference === option.reference )?.display )|| '---'  }
               renderInput={(params)=> <TextField label={props.label} placeholder={props.placeholder||''} {...params} variant={'filled'}  />} />
         } />
    </div>
  );
}

export default ResourcerefAutocomplete;
