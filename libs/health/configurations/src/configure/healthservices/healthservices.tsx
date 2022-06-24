import { CodeAutocomplete, FhirService, SnomedAutoComplete, useFhirQuery, useFhirUpdate } from '@ha/appfhir';
import { ActionButton, Pagetitle } from '@ha/shared-ui';
import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HealthcareService, Organization } from 'fhir/r4';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './healthservices.module.scss';

/* eslint-disable-next-line */
export interface HealthservicesProps {
     managingOrg?:Organization,
     editservice?:HealthcareService
}

export function ConfigureHealthservices({managingOrg,editservice}: HealthservicesProps) {
  const [servicelist,loadError,loadServices,deleteService,createService ]=useFhirQuery<HealthcareService>('HealthcareService');
  const [edithealthservice,setEditHealthService]=useState<HealthcareService|null>(null); 
  const [updatedResource,updateError,updateService]=useFhirUpdate('HealthcareService',edithealthservice);
  const [showEdit,setshowEdit]=useState(false);
 
  const {control,getValues,setValue, register, formState, reset,  handleSubmit }=useForm({ });
  useEffect(()=>{
      if(managingOrg){
          loadServices({organization:managingOrg.id})
      }
  },[managingOrg]); 
  useEffect(()=>{
       if(editservice?.id){
          setEditHealthService(editservice)
       }
  },[editservice]); 

  function startCreate(){
      setEditHealthService(null); 
      reset();
      setshowEdit(true)
  }

  function startEdit(service:HealthcareService){
      setEditHealthService(service); 
      Object.keys(service).forEach( (key)=>{
         setValue(key,service[key as keyof HealthcareService])
      }); 
      setshowEdit(true);
  }
  function showValues(){
       console.log(getValues())
  }
  function saveService(formValue:any){
    console.log('Sav')
      console.log(formValue); 
      if(edithealthservice){
          const resourceToUpdate={...edithealthservice,...formValue}; 
          console.log('Trying to Update');
          updateService(resourceToUpdate).then(res=>{
              setEditHealthService(res);
              loadServices(); 
              toast('Saved')
          })
      }else{
          // Create New and Save 
          if(managingOrg){
            const resourceToSave:HealthcareService = {...formValue,providedBy:FhirService.toReference(managingOrg)}; 
            console.log('Saving',resourceToSave); 
            createService(resourceToSave).then(r=>{
                loadServices(); 
                setshowEdit(false); 
                toast('Resource Created',{})               
            }).catch(err=>{
                toast('Error',{type:'error'})
            })
          }
      }
  }
  return (
    <div className={styles['container']}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Pagetitle title='Health Services'/>
        {/* CREATE NEW+ */}
         <ActionButton onClick={()=>startCreate()} label={<Icon color='secondary'>add</Icon>} />
      </Stack>
      {/* Show Managing Org */}      
      {managingOrg?`@${managingOrg.name} `:null}

      {servicelist.map(s=> <Card key={s.id}>
        <CardContent >  
            <Grid item md={12}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='subtitle1'>{s.name}</Typography>                
                <ActionButton  label='Edit' onClick={()=>startEdit(s)}  />
              </Stack>
            </Grid>
              <Typography variant='caption'> {s.type?.map(t=>t.text).join(',') } </Typography>
        </CardContent>
      </Card> )}
    
    
      <Dialog fullWidth open={showEdit} maxWidth='md' onClose={()=>setshowEdit(false)} >
        <form onSubmit={ handleSubmit(saveService)
            }>          
          <DialogTitle  >
              <Stack direction={'row'} sx={{p:0}} alignItems={'center'} justifyContent={'space-between'}>
                 <Typography>Add Health Service</Typography>
                 <IconButton onClick={()=>setshowEdit(false)} color='error' ><Icon>close</Icon></IconButton>
              </Stack>
          </DialogTitle>
          <DialogContent sx={{p:3,my:1}}  >            
            <Grid container spacing={2}  >
              {/* Add Name */}
              <Grid item md={12} mt={1}>
                     <TextField  fullWidth color={formState.errors['name'] ? 'error':'primary'} {...register('name',{required:true})} label='Name for Service'  />
                     
              </Grid>
              <Grid item md={12} >
                <CodeAutocomplete multiple={true} label='Service Category'
                  name='category' onValueChange={(v) => showValues()} control={control} resourceId='service-category' />
              </Grid>
              <Grid item md={12} >
                <CodeAutocomplete multiple={true} label='Service Type'
                  name='type' onValueChange={(v) => showValues()} control={control} resourceId='service-type' />
              </Grid>
              <Grid item md={12} >
                <SnomedAutoComplete multiple={true} control={control} label={'Specialty'} name='specialty' ecl='< 394658006' queryConfig={{ searchContext: 'concepts', loadOnInit: true }} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
              <ActionButton variant='contained' type={'button'} onClick={()=>setshowEdit(false)} color={'error'} label={'Close'} />
              <ActionButton variant='contained'  type={'submit'}   label={'SAVE'} />
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ConfigureHealthservices;
