import { Button, Container, Grid, Icon, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './edit-location.module.scss';
const Void=()=>{
   //
}
/* eslint-disable-next-line */
export interface EditLocationProps {
    mode:string,
    onCancel?:()=>void,
    onCreate?:()=>void,
    onUpdate?:()=>void
}

export function EditLocation({onCancel=Void,onCreate=Void,onUpdate=Void,mode}: EditLocationProps) {

  const {setValue, setFocus, handleSubmit,control,register}=useForm({})
  useEffect(()=>{
         setFocus('name');
  },[])
  function doSave(value?:any){
       console.log(value)
  }
  return (
    <div className={styles['container']}>
        <Container sx={{display:'flex',alignItems:'center' }}>
            <Stack spacing={2} flex={1}  flexBasis={1}  direction={'row'} alignItems={'center'}>
                          <Icon>{mode==='edit'?'edit':'add'}</Icon> <Typography variant='h5'>  {mode} </Typography>
                      </Stack>
                      <Stack direction={'row'} spacing={2}>
                            {mode==='create'? <Button variant='contained' type='submit' >CREATE</Button>
                               :null}
                            <Button variant='outlined' color='error' onClick={()=>onCancel()}>CANCEL</Button>
                      </Stack>
                  
        </Container>
        <Container sx={{padding:5}}>           
            <form onSubmit={handleSubmit(doSave)}>
                  <TextField fullWidth label='Name' InputLabelProps={{shrink:true}} {...register('name')} />
            </form>
        </Container>
    </div>
  );
}

export default EditLocation;
