import { useReadState } from '@ha/common';
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogProps, DialogTitle, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ImageResource } from '../../lib/resources';
import { DefaultTextFieldProps } from '../../lib/theme.properties';
import styles from './helpdesk-dashboard.module.scss';

/* eslint-disable-next-line */
export interface HelpdeskDashboardProps {}
const enum Modes{
     SEARCH,
     REGISTER_ABHA,
     REGISTER_NORMAL
}
const QuickSearch=(props:{onRegisterMode:(mode:Modes)=>void })=>{
   const [searchResults,setSearchResults]=useState<any[]>([])
   const searchState=useReadState('searchpatient')
   const searchResultState=useReadState('searchresults')
   const searchForm=useForm({defaultValues:{searchtext:'',searchabha:''}}); 
   const searchValue=useWatch({control:searchForm.control,}); 
   useEffect(()=>{
        searchState.setStateValue(searchValue)
   },[searchValue])
   return <Grid container flexGrow={1} >
       <Grid item md={12}>
         
        <Stack spacing={1}>            
               <TextField fullWidth {...DefaultTextFieldProps} label={'Search Mobile/Name...'}  {...searchForm.register('searchtext')} />
                <Typography variant="caption" color="initial">OR</Typography>
               <TextField {...DefaultTextFieldProps} label={'Search ABHA ID'} {...searchForm.register('searchabha')} />

                  <Button variant='outlined' onClick={()=>{
                      searchState.setStateValue([])
                  }}  >FIND</Button>
                
                {searchValue.searchabha? 
                  <Button color={'info'} onClick={()=>props.onRegisterMode(Modes.REGISTER_ABHA) }  >REGISTER USING ABHA</Button> : 
                 <Button color='secondary' onClick={()=>props.onRegisterMode(Modes.REGISTER_NORMAL) } >CONTINUE REGISTRATION</Button>
                }
          
        </Stack>
       </Grid>
</Grid>
} 

const QuickRegister=()=>{
  const searchState=useReadState('searchpatient'); 
 return <Grid container >
        <Grid item >
              <TextField   {...DefaultTextFieldProps}  />
              {JSON.stringify(searchState)}
        </Grid>
</Grid>
}

const QuickAbhaRegister=()=>{
    const searchState=useReadState('searchpatient'); 
    const abhaRegistration=useReadState('abharegister');  
    
    return <Grid container >
        <Grid item  md={2} justifyContent={'center'} >
             <img src={ImageResource.ABHA}  alt={'ABHA'}  width={100} />
        </Grid>
        <Grid item  md={10}>           
              {JSON.stringify(searchState.state)}
        </Grid>
    </Grid>
}

const QuickRegisterDialog=(props:DialogProps)=>{
   const [mode,setMode]=useState<Modes>(Modes.SEARCH); 

   return <Dialog {...props}  fullWidth maxWidth={'lg'}   >
      <DialogTitle>Quick Register</DialogTitle>
      <DialogContent>
            {mode===Modes.SEARCH? <QuickSearch onRegisterMode={(mode)=>{
                  setMode(mode)
            }} /> : (
                                       
                    mode===Modes.REGISTER_ABHA? <QuickAbhaRegister/> :<QuickRegister />                   
            )  }
            <Stack justifyContent={'end'}>
                {mode!==Modes.SEARCH && <Button onClick={()=>setMode(Modes.SEARCH)} >RESET SEARCH</Button> }
            </Stack>
            {/*   

             */}
      </DialogContent>
</Dialog>
            }
export function HelpdeskDashboard(props: HelpdeskDashboardProps) {
  const authState=useSelector((state:any)=>state.auth)
  const [showQRegister,setShowQRegister]=useState(false)
  return (
    <div className={styles['containerr']}>
        <QuickRegisterDialog onClose={()=>setShowQRegister(false)}  open={showQRegister}  />
       <Grid container spacing={1}>
           <Grid item md={3}>
                <Stack>
                    <Button variant='contained' onClick={()=>setShowQRegister(true)} >QUICK REGISTER</Button>
                </Stack>
           </Grid>
           <Grid item  md={9}>
             <Box p={2}>
              <TextField variant='standard' fullWidth label='Search Patient' /> 
             </Box>
        <Card>
            <CardContent>

                <Tabs>
                    <Tab title='Appointments' label="Appointments" />
                    <Tab label='Patients'></Tab>
                </Tabs>
            </CardContent>
        </Card>
           </Grid>
       </Grid>
    </div>
  );
}

export default HelpdeskDashboard;
