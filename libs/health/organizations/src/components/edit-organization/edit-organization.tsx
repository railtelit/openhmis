import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Dialog,DialogTitle,DialogContent,
     DialogActions, Radio, TextField,Button, Autocomplete, Divider, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './edit-organization.module.scss';

/* eslint-disable-next-line */
export interface EditOrganizationProps {
    start?:boolean,
    onClose?:()=>void
}

export function EditOrganization({start=false,onClose=()=>{const i = 0;}  }: EditOrganizationProps) {
  const [startcreate,setStartcreate]=useState<boolean>(start)
  useEffect(()=>{
       setStartcreate(start);
  },[start])
  return (
    <div className={styles['container']}>
           
              <Grid container   justifyContent={'flex-end'}>
                  <Button variant='contained'>SAVE</Button>
                  <Button variant='outlined' onClick={()=>setStartcreate(false)} color={'error'} >CANCEL</Button>
              </Grid>
               
               <form>
                 <Grid container  spacing={2} >
                    <Grid item xs md={12}>
                      <FormControl>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup row>
                                {['active','inactive','suspended'].map(s=><FormControlLabel key={s}
                                    label={s.toLocaleUpperCase()} value={s} control={<Radio/>}></FormControlLabel> )}
                            </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs md={12} >
                      <TextField label="Name" fullWidth required />                                  
                    </Grid> 
                    <Grid item xs md={12} >
                      <Autocomplete  options={[]}  freeSolo 
                            multiple={true} renderInput={(params)=><TextField label='Other Names'   {...params} />}  />                  
                    </Grid>
                    <Grid item md={12} justifyContent={'center'} >
                          <Divider  />
                    </Grid>
                    <Grid item container xs md={12} spacing={1}>  
                              <Typography width={100} textAlign={'center'} variant='body1'>Address</Typography>
                              <Grid item md={12}>                                    
                                  <TextField  fullWidth label='Line 1'/>                                       
                              </Grid>
                              <Grid item   md={12}>                                    
                                  <TextField  fullWidth label='Line 2'/>                                       
                              </Grid>
                              <Grid item   md={6}>                                    
                                  <TextField  fullWidth label='Mobile'/>                                       
                              </Grid>
                    </Grid> 
                 </Grid>
                </form>    
      
    
    </div>
  );
}

export default EditOrganization;
