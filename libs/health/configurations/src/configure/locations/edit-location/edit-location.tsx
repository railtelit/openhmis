import { useFhirConverter, useFhirCreate, useFhirUpdate } from '@ha/appfhir';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Icon, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './edit-location.module.scss';
const Void = () => {
  //
}
/* eslint-disable-next-line */
export interface EditLocationProps {
  mode: string,
  onCancel?: () => void,
  onCreate?: (res:any) => void,
  onUpdate?: () => void,
  record?: any
}

export function EditLocation({ onCancel = Void, onCreate = Void, onUpdate = Void, mode, record = null }: EditLocationProps) {
  const [newlocation,createerror, createLocation] = useFhirCreate('Location');
  const { convertToForm, convertToResource } = useFhirConverter('Location')
  const { setValue, setFocus, handleSubmit, control, register } = useForm({ defaultValues: { status: 'active' } } as any);
  const [update,updateerror,updateLocation] = useFhirUpdate('Location',record)
  useEffect(() => {
    setFocus('name');
    // setValue('status','active')

  }, []);

  useEffect(() => {
    //console.log('Setting Loc',record)
    if (record) {
        Object.keys(record).forEach(key => setValue(key, record[key]));
    }
  }, [record]);


  function doSave(value?: any) {

    const res = convertToResource(value)
    console.log('saving Loc', res);
    if(mode==='create'){
        createLocation(res).then(r=>{
            onCreate(r); toast.success('Location Created',{})
        })
    }else if(mode==='edit'){
         updateLocation(res).then(_=>{
               toast.success('Saved');
         })
    }
  }
  return (
    <div className={styles['container']}>
      <form onSubmit={handleSubmit(doSave)}>
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack spacing={2} flex={1} flexBasis={1} direction={'row'} alignItems={'center'}>
            <Icon>{mode === 'edit' ? 'edit' : 'add'}</Icon> <Typography variant='h5'>  {mode} </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            {mode === 'create' || mode ==='edit' ?
              <Button variant='contained' type='submit' > {mode==='edit'?'UPDATE':'CREATE'} </Button>
              : null}            
            <Button variant='outlined' color='error' onClick={() => onCancel()}>CANCEL</Button>
          </Stack>

        </Container>
        <Container sx={{ padding: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md>
              <FormControl>
                <FormLabel >Status</FormLabel>
                <Controller name='status' control={control} render={({ field }) =>
                  <RadioGroup  {...field} row >
                    {['active', 'suspended', 'inactive'].map(status =>
                      <FormControlLabel key={status} label={status.toUpperCase()} value={status} control={<Radio />} />)}
                  </RadioGroup>
                } />
              </FormControl>
            </Grid>
            <Grid item md xs={12} >
              <TextField fullWidth label='Name' InputLabelProps={{ shrink: true }} {...register('name')} />
            </Grid>
            <Grid item md={12}>
              <TextField {...register('description')} label='Description' fullWidth />
            </Grid>
            <Grid item md={3}>
              <TextField {...register('mobileno')} label='Mobileno' fullWidth />
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
}

export default EditLocation;
