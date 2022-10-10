import { useApiService, useApiState, useReadState } from '@ha/common';
import { Pagetitle, T, TF } from '@ha/shared-ui';
import { Grid, Button, IconButton, TextField, InputAdornment, Stack, Typography, Dialog, DialogContent, Card, CardMedia, CardContent, Icon, FormControl, FormLabel, ToggleButtonGroup, ToggleButton, Autocomplete, TextFieldProps, Box, DialogTitle, DialogContentText, DialogActions, List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminActions } from '../../lib/admin.actions';
import { ROLES } from '../../lib/rolemaster';
import styles from './manage-worker.module.scss';

/* eslint-disable-next-line */
export interface ManageWorkerProps {}

interface WorkerInterface{
       id:number,  username:string, firstname:string,lastname:string,userid:string,email:string,mobileno:string, userroles?:{roleid:number,role:string}[]
}
const DefaultTextFieldProps:TextFieldProps={InputLabelProps:{shrink:true},variant:'standard',autoComplete:'off'}

const WorkerForm=({mode='new',edit=null,onClose,onSave}:{mode?:string,edit?:WorkerInterface|null,onClose:()=>void,onSave:(result:any)=>void } )=>{
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
                  onSave(res)
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
  const [showRolesUpdate,setShowRolesUpdate]=useState(false)
  const apiService = useApiService()
  const [newRoleState,setNewRoleState]=useState<{role:string,location:any}|undefined>()
  function startCreate(){
      setMode('new'); setCurrent(null);
      setShowForm(true)
  }
  function initUpdateRoles(worker:WorkerInterface){
      setCurrent(worker); 
      setShowRolesUpdate(true)
  }
  function unAssignRole(role:any){
           if(current){
                 const pr = {userid:current.userid,roleid:role.roleid};
                 apiService.post(AdminActions.helpdesk.unAssignRole,pr).then(res=>{
                       toast.success(`Updated`);
                       //setShowRolesUpdate(false);
                       setCurrent((current)=>  current && ({...current ,userroles:current?.userroles?.filter( (r:any) =>r?.roleid!==role.roleid) }) ); 
                       workerState.loadState();
                 }).catch(err=>{
                    toast.error(`Application Error : ${err?.message}`)
                 })
           }
  }
  function assignRole(){

       current && apiService.post(AdminActions.helpdesk.assignRole,
               {userid:current.userid, ...newRoleState }
          ).then(res=>{
              toast.success(`Roles Assigned`);
              setCurrent((current:any)=> ({...current ,userroles: !current.userroles?.find( (r:any) =>r.roleid===res.roleid) ? [...current.userroles,res ] :current.userroles }) ); 
              workerState.loadState()
          }).catch(err=>{
              console.log(err)
              //toast.error(`${(err?.response?.data?.message||[])?.join(',') }`)
          })
  }

  return (
    <div className={styles['container']}>
        <Grid container justifyContent={'space-between'}> 
            <Pagetitle  title='Manage HelpDesk Team' />
            <Link to={'..'}>
                <IconButton  color='error' ><Icon>analytics</Icon></IconButton>
            </Link>
        </Grid>
        {/* Worker Update dialog Form */}
          <Dialog  open={showForm } >
             <DialogTitle title='Add New Worker' padding={0}>
                    <Typography variant='h3'>New Organisation Worker</Typography>
             </DialogTitle>
              <DialogContent  > 
                  <WorkerForm  onSave={(val)=>{ setShowForm(false); workerState.loadState(); }}
                  onClose={()=>{
                       setShowForm(false)
                  } } />
              </DialogContent>
          </Dialog>
          {/* Update Roles dialog */}
          <Dialog open={showRolesUpdate} fullWidth maxWidth={'md'}  onClose={()=>setShowRolesUpdate(false)}>
            <DialogTitle >
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                      <Typography color="initial"  >ROLES</Typography>
                      <IconButton onClick={()=>setShowRolesUpdate(false)} color={'error'}><Icon>close</Icon></IconButton>
                  </Stack>
            </DialogTitle>
            <DialogContent>
                  <Grid container alignItems={'center'} spacing={2} p={2} >                      
                          <Avatar  />
                          <Stack ml={1}>   
                              <Typography variant='h6'> {current?.username} </Typography>
                              <Typography variant='caption'>Userid : {current?.userid} </Typography>
                          </Stack>

                  </Grid>
                  <Grid container spacing={2}>
                      <Grid item md={4}  xs >
                          <FormControl fullWidth>
                              <FormLabel>Location</FormLabel>
                              <Autocomplete id='locations' 
                              fullWidth 
                              onChange={(e,val:any)=> setNewRoleState((rs:any)=>({...rs,location:val})) }
                              getOptionLabel={(o:any)=>o?.locationname }
                              isOptionEqualToValue={ (o,v)=>( o?.id === v?.id ) }
                              options={ locations.state|| []} 
                              renderInput={(params)=> <TextField {...params} {...DefaultTextFieldProps} /> } />
                          </FormControl>
                      </Grid>
                      <Grid item md={4} xs>
                          <FormControl fullWidth>
                              <FormLabel>Role</FormLabel>
                              <Autocomplete id='role' 
                              fullWidth  value={newRoleState?.role}
                              onChange={(e,val:any)=> setNewRoleState((rs:any)=>({...rs,role:val})) }
                              getOptionLabel={(o:any)=>o }
                              isOptionEqualToValue={ (o,v)=>( o === v ) }
                              options={ ROLES.helpdesk|| []} 
                              renderInput={(params)=> <TextField {...params} {...DefaultTextFieldProps} /> } />
                          </FormControl>
                          {/* <TextField label={'Role Name'} onChange={(e)=> setNewRoleState( (rs:any)=>({...rs,role:e.target.value})) } {...DefaultTextFieldProps} /> */}
                      </Grid>
                      <Grid item>
                          <Button onClick={()=>{ assignRole() }} >ASSIGN ROLE</Button>
                      </Grid>
                  </Grid>
                  <Divider/>
                  <Typography variant="body2" color="initial"> Roles </Typography>
                  <List>
                      {current?.userroles?.map( (role:any)=> <ListItem key={role.roleid} secondaryAction={<Button color={'error'} onClick={()=>unAssignRole(role)} >UN ASSIGN</Button>} >
                          <ListItemText primary={role?.role} secondary={ role?.location?.locationname }  />
                      </ListItem> )}
                  </List>
            </DialogContent>
                  
          </Dialog>
         <Card>
            <CardContent>
                <Grid container justifyContent={'space-between'}>
                    <Typography>

                    </Typography>
                    <Box>
                    <Button onClick={()=>{
                        startCreate();
                    }} > ADD NEW MEMBER <Icon>add</Icon></Button>
                    <IconButton aria-label="" onClick={()=>workerState.loadState()}>
                        <Icon>refresh</Icon>
                    </IconButton>
                    </Box>                    
                </Grid>
                <DataGrid  density='compact' showColumnRightBorder={true}  showCellRightBorder={true}                         
                     getRowId={ (r)=>r.userid } 
                  autoHeight={true} sx={{minHeight:'300px'}}
                     rows={ workerState.state || [ ]} 
                     columns={[ {field:'userid',flex:1,},
                     {field:'username',flex:1},{field:'primaryrole',headerName:'Roles', flex:2,
                       valueGetter:( params ) =>{ 
                         return  params.row?.userroles?.map( (r:any)  =>r?.role).join(',')?.toUpperCase()
                     }   } , 
                      { align:'center', flex:1, headerName:'', field:'',renderCell:(params)=>  <Button sx={{m:3}} onClick={()=>initUpdateRoles(params.row)} > ROLES</Button>  }
                      ]}   />
            </CardContent>
         </Card>

        
    </div>
  );
}

export default ManageWorker;
