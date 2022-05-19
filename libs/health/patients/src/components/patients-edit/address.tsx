import { Box, Card, CardContent, Container, Grid, TextField, Typography } from "@mui/material"
import { margin } from "@mui/system"
import { Control, FieldValue, FieldValues, UseFormRegister } from "react-hook-form"


export interface AddressFormProps{
        id:any,
        index:number,
        control?:Control,
        errors?:any,
        register:UseFormRegister<FieldValues>
}

export const AddressForm = ({id,index,control,register,errors={}}:AddressFormProps)=>
        <Card elevation={1}> 
        <CardContent>
        <Box marginY={1} component='form' >
            <Container>
                <Typography  margin={1} variant='h6'>{'Address '+(index+1)}</Typography>   
            </Container>
            <Grid container spacing={2}>
              <Grid item md={6}>
                   <TextField fullWidth {...register(`address.${index}.line1`) } label='Address Line 1'></TextField>               
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