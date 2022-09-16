import { Box, Button, Grid, Modal, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {  Control, Controller, useForm } from "react-hook-form";

export interface CredentialForm{
         healthId:string, password:string
}

export interface SetPasswordFormInterface{
        visible:boolean,
        onSetCredentials:(value:CredentialForm)=>void,     
        control:Control
}

export function SetPasswordForm(props:SetPasswordFormInterface){
    const [show,setShow]=useState(props.visible); 
    const pform= useForm<CredentialForm>({defaultValues:{}});
    useEffect(() => {
            setShow(props.visible); 
            
    }, [props.visible])
    
    return  <Grid p={2} container direction={'column'} spacing={2} >
                    <Grid item>
                            <Controller control={props.control} 
                                    name={'healthId'}
                                    render={({field,})=><TextField variant="standard" {...field}
                                        helperText={'Example : firstname.lastname'} 
                                        InputLabelProps={{shrink:true}} fullWidth label={'New Health Id'}/>
                               } />

                            
                    </Grid>
                    <Grid item>
                    <Controller control={props.control} 
                                    name={'password'}
                                    render={({field,})=><TextField variant="standard" fullWidth {...field}
                                    InputLabelProps={{shrink:true}}  
                                    label={'PassWord'} type='password' />
                               } />
                            
                    </Grid>
                    <Grid item container justifyContent={'end'} >
                            <Button variant="contained" onClick={()=>props.onSetCredentials(pform.getValues())} >PROCEED</Button>
                            {/* <Button variant="outlined" color="error"
                                 onClick={()=>setShow(false)} >BACK</Button> */}
                    </Grid>
                    
                </Grid>
         
    
}