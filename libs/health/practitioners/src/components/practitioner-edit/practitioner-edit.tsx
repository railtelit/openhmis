
import { Button, ButtonGroup,   } from '@mui/material';
import {   Practitioner } from 'fhir/r4';
import {  useMemo } from 'react';
import {   useForm } from 'react-hook-form';
import styles from './practitioner-edit.module.scss';
import {NameFormField, useFhirCreate} from '@ha/appfhir'

/* eslint-disable-next-line */
export interface PractitionerEditProps {
    editpractitioner?:Practitioner,
    onCreate?:(pract:Practitioner)=>void
}


export function PractitionerEdit(props: PractitionerEditProps) {
  const pracform = useForm({}); 
  const [createresponse,createerror,createPractitioner]=useFhirCreate<Practitioner>('Practitioner'); 
  const mode = useMemo(()=> props.editpractitioner?'Update':'Create',[props.editpractitioner] )
  function onSave(value:any){
      console.log(value);
      createPractitioner({...value,active:true}).then(resource=>{
             props.onCreate && props.onCreate({...resource})
      })
  }
  return (
    <div className={styles['container']}>
        <form onSubmit={pracform.handleSubmit(onSave)}>
            <NameFormField prefix='Dr.' control={pracform.control} name='name' value={props?.editpractitioner?.name} />
            <ButtonGroup sx={{p:1}}>
                <Button type='submit'> {mode} </Button>
            </ButtonGroup>
        </form>
    </div>
  );
}

export default PractitionerEdit;
