import { useApiService, useApiState, useReadState } from '@ha/common';
import { T, TF } from '@ha/shared-ui';
import { TabPanel } from '@mui/lab';
import { Autocomplete, Button, Card, CardContent, Dialog, FormControl, FormLabel, Grid, Icon, IconButton, Stack, Tab, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './setup-location.module.scss';

/* eslint-disable-next-line */
export interface SetupLocationProps {}

const RoleTypeOptions=[ {label:'Hospital Unit',value:'HUNIT'},{label:'LAB',value:'LAB'} ]

const PhysicalTypeOptions:{label:string,value:string}[]=[ {label:'Site',value:'si'} ,{label:'Ward',value:'wa'},{label:'Wing',value:'wi'},
        {label:'Building',value:'bu'} ]

const CreateLocationForm=( props:{onSave:()=>void} )=>{
  //  const orgState=useReadState('orgs')
   const orgState = useApiState('orgs',{processGroup:'admin'}); 

   const locForm = useForm({defaultValues:{physicaltype:'',locationname:'',roletype:null ,org:null }}); 

   const physicalType = locForm.watch('physicaltype');

   const apiService=useApiService()

   return  <form onSubmit={  locForm.handleSubmit( (val)=>{
         console.log(val);
         apiService.post(`admin/locations`, val ).then( res=>{
           // 
            toast.success(`Location Saved`);
           locForm.reset() ; 
           props.onSave();
         })
   } ) }>
     <Grid container spacing={2} >
          <Grid item md={12} >
                                                  
                <TextField variant='filled' fullWidth {...locForm.register('locationname')} label={'Name'} />
          </Grid>
          <Grid item md={12}>
                <Autocomplete   fullWidth options={orgState.state||[]} onChange={(e,value)=> locForm.setValue('org',value) }
                  getOptionLabel={ (o:any)=>o?.orgname } renderInput={ (params)=><TF label={'Select Organisation Level'} {...params} /> } />
          </Grid>
          <Grid item md={12}>
                <Autocomplete  fullWidth options={RoleTypeOptions||[]}  onChange={(e,v:any)=> v && locForm.setValue('roletype',v?.value )}

                   isOptionEqualToValue={( o,v )=>o.value===v.value}
                  getOptionLabel={ (o:any)=>o?.label } renderInput={ (params)=><TF label={'Role Type'} {...params} /> } />
          </Grid>
          <Grid item md={12}>
              <FormControl>
                  <FormLabel>Physical Type</FormLabel>
                  <ToggleButtonGroup value={physicalType} >
                      {PhysicalTypeOptions.map( pt =>  <ToggleButton onClick={()=>locForm.setValue('physicaltype',pt.value)} key={pt.value}  value={pt.value}  > {pt.label}</ToggleButton>  )}
                  </ToggleButtonGroup>
              </FormControl>
          </Grid>
          <Button type='submit' >SAVE</Button>
   </Grid>
   </form>
  
}

export function SetupLocation(props: SetupLocationProps) {
  const locState=useApiState<any[]>('locations',{processGroup:'admin'})
  const apiService=useApiService()
  return (
    <div className={styles['container']}>
      <Card>
          <CardContent>
        <Grid container justifyContent={'space-between'} >
           <Typography variant='h6'> Setup Locations </Typography>
           <Link to={'..'}>
              <IconButton ><Icon>undo</Icon></IconButton>
            </Link>
        </Grid>
        <CreateLocationForm  onSave={()=>{
            locState.loadState() ;
        }} />
        {
          locState.state && locState.state.map(loc=><Grid item key={loc?.id} md={4} xs={12} >
                <Card>
                    <Typography> {loc?.locationname} </Typography>
                    <CardContent>
                        <Stack spacing={2}>
                             <FormControl> 
                                <FormLabel>Role Type</FormLabel>
                                <Typography> {loc?.roletype} </Typography>
                             </FormControl>
                             <Button fullWidth color='error' onClick={()=>{
                                //    
                                      apiService.del(`admin/locations/${loc?.id}`,{id:loc?.id}).then(rem=>{
                                            locState.loadState();
                                      })
                              }} >REMOVE</Button>
                        </Stack>
                    </CardContent>
                </Card>
          </Grid> )
        }
          </CardContent>
      </Card>
    </div>
  );
}

export default SetupLocation;
