import { Box, Button, ButtonGroup, Grid, Icon, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material';
import styles from './appointments-edit.module.scss';
import { useRef } from 'react';
import { useFhirConverter, useFhirCreate, useFhirQuery, useFhirResolver, useFhirUpdate, AppointmentConverter } from '@ha/appfhir';
import { toast } from 'react-toastify';
import { useFieldArray, useForm } from 'react-hook-form'
import {debounceTime,tap,distinctUntilChanged} from 'rxjs/operators'
import {BehaviorSubject, Subject} from 'rxjs'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';


/* eslint-disable-next-line */
export interface AppointmentsEditProps {

  onClose?:()=>void,
  onCreate?:(newResource:any)=>void,
  record?:any
  mode:string

  //patientName:string;

}

const searchSubject_p = new Subject<string>();
let newList:any = [];
//let patientId:string;


export function AppointmentsEdit({onClose=()=>{const i = true },mode,onCreate,record}: AppointmentsEditProps) {

  const nameRef=useRef<HTMLInputElement|null>();

  const [newAppointment, error, createAppointment,  ]=useFhirCreate('Appointment');
  const [results,queryerror,query,deletePatient,queryPatients]=useFhirQuery('Appointment')
  const {convertToResource, convertToForm, result} = useFhirConverter('Appointment')
  const {register,handleSubmit, control, formState:{errors,}, setValue,  setFocus }=useForm({    });
  const { fields,append,prepend,move,insert,remove, }=useFieldArray({control,name:'address' });
  const [update,updateError,updateAppointment]=useFhirUpdate('Appointment',record);
  const [search,setSearch]=useState<any>('');
  const [limit,setLimit]=useState<number>(10);
  const [patients,errors_p,queryPatients_p] = useFhirQuery('Patient',{name:search,_count:limit});

  const [patientId, setPatientId] = useState<any>();


  useEffect(() => {
    const loadUsers = async () => {
      //const response = await axios.get('https://reqres.in/api/users');
      const response = await axios.get('http://at.erpapps.in/fhir/Patient?_count=10&name=');
      const posts = response.data.entry;

      console.log(posts)
      newList = [];
      for (var i = 0; i < posts.length; i++){

        newList.push( { id : posts[i].resource.id , label :  posts[i].resource.name[0].family })
      }

      console.log("newList- "+newList)

    }
    loadUsers()
    }, [])





  const defaultAddress ={line1:'',line2:'',city:null,state:null,pincode:'' } ;


  // patient query

      useEffect(()=>{
            const  sub = searchSubject_p.asObservable().pipe(
            distinctUntilChanged(),
            debounceTime(900)
      ).subscribe({next:(val)=>{
            setSearch(val);
            queryPatients_p({name:val})
            //patientName = val;
            //alert(val);
      }});
      queryPatients_p();
      //alert(sub)
      return ()=>
      {
            sub.unsubscribe();
      }
      },[])



  useEffect(()=>{
          console.log(`Pat Created : `);
          console.log(newAppointment);
          newAppointment && newAppointment.id && onCreate && toast.success('Record Created ');
  },[newAppointment])

  useEffect(()=>{

     if(mode==='edit' && record){
        const formValue = convertToForm(record);
        console.log(`Setting`);
        console.log(formValue)
        Object.keys(formValue).forEach(field=>{

          if(field == "start"){
            setValue(field,formValue[field].substring(0, 16));
          }else if(field == "end"){
            setValue(field,formValue[field].substring(0, 16));
          }else{
            setValue(field,formValue[field]);
          }
        })
      }
  },[])


  async function onSave(formValue:any){

    let newRecord= convertToResource(formValue)
    //let newRecord = formValue;
    newRecord.start && ( newRecord.start += 'Z')
    newRecord.end && ( newRecord.end += 'Z')
    newRecord.participant[0].actor.reference && ( newRecord.participant[0].actor.reference = patientId)
    //console.log("Record "+newRecord.end);
    // makeRequest(newRecord)
    if(mode==='edit')
            updateAppointment(newRecord).then(_=>{
                    toast.success(`Record Updated SuccessFully `)
          });
      else
          await createAppointment(newRecord);

}

console.log(newList)

  return (

    <form onSubmit={handleSubmit(onSave)}>

      <div className={styles['container']}>

        <Stack  direction={'row'} spacing={1} m={1}  p={1}  justifyContent={'end'}>
                <Button  type='submit' variant='contained'  >{mode==='create'?'CREATE':'UPDATE'}</Button>
                <Button  variant='contained' color='error' onClick={ onClose!==undefined ? onClose: ()=>{
                  } } >CLOSE</Button>

        </Stack>

        <Grid container spacing={2} >

            <Grid item md={4}>

                <Autocomplete disablePortal id="combo-box-demo"
                    options={newList}
                    onChange={(event:any, value:any) =>{

                      var obj = JSON.parse(JSON.stringify(value));
                      setPatientId("Patient/"+obj.id);
                    }}
                    renderInput={(params:any) => <TextField {...register('participant')} {...params} label="Patient" />}/>

                    <TextField inputRef={input => input && input.focus()} {...register('participantReference')} value={patientId} autoFocus />
            </Grid>
            <Grid item md={4}>
                  <TextField {...register('start')} type='datetime-local'  InputLabelProps={{shrink:true}} label='Start Date and Time' required fullWidth   />
            </Grid>
            <Grid item md={4}>
                  <TextField {...register('end')} type={'datetime-local'} InputLabelProps={{shrink:true}} label='End Date and Time' required fullWidth   />
            </Grid>


            <Grid item md={4}>
                  <TextField {...register('category')}  label='Category' select fullWidth placeholder='Category' >
                      <MenuItem value='Adoption'>Adoption</MenuItem>
                      <MenuItem value='Aged Care'>Aged Care</MenuItem>
                      <MenuItem value='Allied Health'>Allied Health</MenuItem>
                      <MenuItem value='Alternative/Complementary Therapies'>Alternative/Complementary Therapies</MenuItem>
                      <MenuItem value='Child Care /Kindergarten'>Child Care /Kindergarten</MenuItem>
                      <MenuItem value='Child Development'>Child Development</MenuItem>
                      <MenuItem value='Child Protection & Family Services'>Child Protection & Family Services</MenuItem>
                      <MenuItem value='Community Health Care'>Community Health Care</MenuItem>
                      <MenuItem value='Counselling'>Counselling</MenuItem>
                      <MenuItem value='Crisis Line (GPAH use only)'>Crisis Line (GPAH use only)</MenuItem>

                  </TextField>
            </Grid>
            <Grid item md={4}>
                  <TextField {...register('specialty')}  label='Specialty' select fullWidth placeholder='Specialty' >
                      <MenuItem value='Anesthetics'>Anesthetics</MenuItem>
                      <MenuItem value='Burns care'>Burns care</MenuItem>
                      <MenuItem value='Cardiology'>Cardiology</MenuItem>
                      <MenuItem value='Dermatology'>Dermatology</MenuItem>
                      <MenuItem value='Diabetic medicine'>Diabetic medicine</MenuItem>
                      <MenuItem value='Gynecology'>Gynecology</MenuItem>
                      <MenuItem value='Neurology'>Neurology</MenuItem>
                      <MenuItem value='Psychiatry'>Psychiatry</MenuItem>
                      <MenuItem value='Psychotherapy'>Psychotherapy</MenuItem>
                      <MenuItem value='Radiology'>Radiology</MenuItem>

                  </TextField>
            </Grid>
            <Grid item md={4}>
                  <TextField {...register('appointmentType')}  label='Type' select fullWidth placeholder='Type' >
                      <MenuItem value='CHECKUP'>CHECKUP</MenuItem>
                      <MenuItem value='EMERGENCY'>EMERGENCY</MenuItem>
                      <MenuItem value='FOLLOWUP'>FOLLOWUP</MenuItem>
                      <MenuItem value='ROUTINE'>ROUTINE</MenuItem>
                      <MenuItem value='WALKIN'>WALKIN</MenuItem>

                  </TextField>
            </Grid>


            <Grid item md={4}>
                  <TextField {...register('status')}  label='Status' select fullWidth placeholder='Status' >
                      <MenuItem value='proposed'>Proposed</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                      <MenuItem value='booked'>Booked</MenuItem>
                      <MenuItem value='arrived'>Arrived</MenuItem>
                      <MenuItem value='fulfilled'>Fulfilled</MenuItem>
                      <MenuItem value='cancelled'>Cancelled</MenuItem>
                      <MenuItem value='noshow'>No show</MenuItem>
                      <MenuItem value='entered-in-error'>Entered-In-Error</MenuItem>
                      <MenuItem value='checked-in'>Checked-In</MenuItem>
                      <MenuItem value='waitlist'>Waitlist</MenuItem>
                  </TextField>
            </Grid>
            <Grid item md={4}>
                  <TextField {...register('healthprof')}  label='Health Prof' fullWidth placeholder='Health Prof' ></TextField>
            </Grid>


            {/* <Grid item md={4}>
                  <TextField {...register('speciality')}  label='Specialty' fullWidth placeholder='Specialty' ></TextField>
            </Grid> */}
            <Grid item md={12}>
                  <TextField label='Description' {...register('description')} multiline={true} rows={3} fullWidth />
            </Grid>

        </Grid>

      </div>
    </form>
  );
}

export default AppointmentsEdit;
