import { Stack, TextField } from '@mui/material';
import { HumanName } from 'fhir/r4';
import { useEffect } from 'react';
import { useForm, Control, Controller } from 'react-hook-form';
import styles from './name-form-field.module.scss';

/* eslint-disable-next-line */
function NameInputs(props:{ value:HumanName , onChange:(value:HumanName)=>void}){
  const nameform = useForm({defaultValues:{use:'official',first: props.value.given?.[0] ||'',middle: props.value.given?.[1] ||'',
      last: props.value.family ||''}}); 
 
  useEffect(()=>{
      console.log('Setting InitialName',props.value); 
      const {unsubscribe} = nameform.watch((value:any)=>{
      //  console.log('Changed',value);
        //const formValues=nameform.getValues(); 
        props.onChange( { text: value['first']+' '+value['middle']+' '+value['last'] ,
        given:[ value['first'] , value['middle'] ],family:value['last'] } )
      })
      //nameform.setValue( 'first',props);
  return ()=>unsubscribe();
  },[])
  return <Stack direction={'row'} spacing={1} justifyContent={'start'} >
       <TextField {...nameform.register('first')} label='First Name' />
       <TextField {...nameform.register('middle')} label='Middle Name' />
       <TextField {...nameform.register('last')} label='Last Name' />
  </Stack>
}

export interface NameFormFieldProps{
  control:Control,
  value?:HumanName[],
  name:string
}
export function NameFormField(props:NameFormFieldProps){
  return <div>
    <Controller    control={props.control} name= {props.name} defaultValue={props.value?.[0]||{given:['']} }
        render={({field})=> <NameInputs  value={field.value||{given:['']}} 
          onChange={(val)=>{ 
              //console.log('Update',val)
              field.onChange(val) } } />
        }
      />
  </div>
}
export default NameFormField;
