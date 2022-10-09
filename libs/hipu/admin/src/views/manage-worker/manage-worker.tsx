import { useApiService, useApiState, useReadState } from '@ha/common';
import { Pagetitle, T, TF } from '@ha/shared-ui';
import { Grid, Button, IconButton, TextField, InputAdornment, Stack, Typography, Dialog, DialogContent, Card, CardMedia, CardContent, Icon, FormControl, FormLabel, ToggleButtonGroup, ToggleButton, Autocomplete, TextFieldProps } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ROLES } from '../../lib/rolemaster';
import styles from './manage-worker.module.scss';

/* eslint-disable-next-line */
export interface ManageWorkerProps {}

interface WorkerInterface{
       id:number, firstname:string,lastname:string,userid:string,email:string,mobileno:string
}
const DefaultTextFieldProps:TextFieldProps={InputLabelProps:{shrink:true}}

const WorkerForm=({mode='new',edit=null,onClose}:{mode?:string,edit?:WorkerInterface|null,onClose:()=>void } )=>{
      const wform = useForm({ defaultValues:{firstname:'',lastname:'',userid:null} as any })
      const locationState=useReadState('locations')
      const hspState = useReadState('hsp') 
      const orgState = useReadState('orgs') 
      const userid=useWatch({
          control:wform.control, name:'userid'
      })
      const locationValue=wform.watch('location')
      const roleValue=wform.watch('primaryrole')
      const roles=ROLES.helpdesk
      const apiService=useApiService( )
      useEffect(() => {
          wform.reset(); 
          if(edit){
              Object.keys(edit).forEach( (key  )=>{
                  wform.setValue(key,edit[key as keyof WorkerInterface])
              } )
          }        
      }, [edit])
      
      function handleSave( value:any){
          // 
           apiService.post(`admin/worker`,{...value, 
            org:orgState.state?.[0],
            username:`${value?.firstname} ${value?.lastname}`}).then(res=>{
              //
           })
      }
      
     return  <form onSubmit={wform.handleSubmit( (val)=>handleSave(val) )}>
      <Grid container spacing={2} p={3}>
            <Grid item md={12}>
               <FormControl>
                  <FormLabel>Select Role</FormLabel>
                 <ToggleButtonGroup value={roleValue}    >
                        {ROLES.helpdesk.map(r=> <ToggleButton key={r} value={r} onClick={()=>{
                           wform.setValue('primaryrole',r)
                        }}  > <Typography    textTransform={'uppercase'}>{r} </Typography> </ToggleButton> )}
                 </ToggleButtonGroup>
               </FormControl>
            </Grid>

            <Grid item md={6} >
                <TextField   {...DefaultTextFieldProps}  fullWidth  variant='standard' label={'First Name'}  {...wform.register('firstname' )}/>                 
            </Grid>
            <Grid item md={6} >
                <TextField  fullWidth variant='standard'   {...DefaultTextFieldProps} label={'Last Name'}  {...wform.register('lastname')}/>                                 
            </Grid>
            <Grid item md={12}>
                      <FormControl fullWidth>
                          <FormLabel>Select Location</FormLabel>
                  <Controller  name='location' defaultValue={{id:0,locationname:''}}  control={wform.control}   render={ ({field})  => 
                      <Autocomplete  value={field.value}   options={locationState.state||[]} getOptionLabel={(o:any)=> o?.locationname||'' }                          
                        isOptionEqualToValue={ (o,v)=> o&&o?.id===v?.id } 
                          onChange={(e,value)=>{
                                field.onChange(value)
                          }}
                           renderInput={ (params)=> <TextField variant='standard' {...params}  />} /> 
                   } />
                      </FormControl>
            </Grid>
            <Grid item md={6}  xs={12}>
                  <Stack direction={'row'} alignItems={'center'} >                   
                    <TextField autoComplete='off'  {...DefaultTextFieldProps} fullWidth variant='standard' label={'Login Userid'}  { ...wform.register('userid',{required:true}) }   />
                    <Typography variant="caption" textTransform={'uppercase'} color="initial">@rtel</Typography>
                </Stack>
            </Grid>
            <Grid md={12}   item >
                  <Stack direction={'row'} spacing={2} justifyContent={'end'}>

                <Button variant='outlined' color='error'  onClick={()=>{  onClose(); }} >CANCEL</Button>
                <Button variant='contained' disabled={!userid} type='submit' >SAVE</Button>
                  </Stack>
            </Grid>
            
     </Grid>   
     </form>
}

export function ManageWorker(props: ManageWorkerProps) {
  const hspState=useApiState('hsp',{processGroup:'admin'}) ;
  const orgState=useApiState('orgs',{processGroup:'admin'}) ;
  const locations=useApiState('locations',{processGroup:'admin'})
  const workerState = useApiState('worker',{processGroup:'admin'}); 
  const [current,setCurrent]=useState<WorkerInterface|null>(null)
  const [mode,setMode]=useState('new')
  const [showForm,setShowForm]=useState(false)
  function startCreate(){
      setMode('new'); setCurrent(null);
      setShowForm(true)
  }

  return (
    <div className={styles['container']}>
        <Grid container>                         
            <Pagetitle  title='Manage HelpDesk Team' />
        </Grid>
          <Dialog  open={showForm } >
              <DialogContent  > 
                  <WorkerForm  onClose={()=>{
                       setShowForm(false)
                  } } />
              </DialogContent>
          </Dialog>
         <Card>
            <CardContent>
                <Grid container justifyContent={'space-between'}>
                    <IconButton onClick={()=>{
                        startCreate();
                    }} ><Icon>add</Icon></IconButton>
                </Grid>
                <DataGrid  getRowId={ (r)=>r.userid } 
                  autoHeight={true} sx={{minHeight:'300px'}}
                 rows={ workerState.state || [ ]} columns={[ {field:'userid'},{field:'username'},{field:'primaryrole'}  ]}   />
            </CardContent>
         </Card>

        
    </div>
  );
}

export default ManageWorker;
