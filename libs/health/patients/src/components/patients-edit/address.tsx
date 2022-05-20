import { Box, Card, CardContent, Container, Grid, Icon, IconButton, TextField, Typography } from "@mui/material"
import { margin } from "@mui/system"
import { Control, FieldValue, FieldValues, UseFormRegister } from "react-hook-form"


export interface AddressFormProps{
        id:any,
        index:number,
        control?:Control,
        errors?:any,
        register:UseFormRegister<FieldValues>,
        onRemove?:(index:number)=>void
}

export const AddressForm = ({id,index,control,register,errors={},onRemove=()=>{ const i =0; }}:AddressFormProps)=>
        <Card elevation={1}> 
        <CardContent>
        <Box marginY={0}  >
            <Box sx={{display:'flex'}} justifyContent={'space-between'} >
                 <div>
                         <Typography style={{display:'flex'}} margin={1} variant='h6'>{'Address '+(index+1)}</Typography>  
                 </div>
                 <div>
                    {index>0?<IconButton color="error" onClick={()=> onRemove(index) }> <Icon>delete</Icon> </IconButton>:null} 
                 </div>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                   <TextField fullWidth {...register(`address.${index}.line1`) } focused={false} label='Address Line 1'></TextField>               
              </Grid>
              <Grid item md={6}>
                   <TextField fullWidth {...register(`address.${index}.line2`) } label='Address Line 2'></TextField>               
              </Grid>
              <Grid item md={4}>
                   <TextField fullWidth {...register(`address.${index}.city`) } label='City'></TextField>               
              </Grid>
              <Grid item md={4}>
                   <TextField fullWidth {...register(`address.${index}.state`) } label='State'></TextField>               
              </Grid>
              <Grid item md={4}>
                   <TextField error={errors[`address.${index}.postalCode`]!==undefined }  
                    fullWidth {...register(`address.${index}.postalCode` ,{maxLength:6})  } label='Pin Code'></TextField>               
              </Grid>
          </Grid>
            
        </Box>
        </CardContent>
        </Card>