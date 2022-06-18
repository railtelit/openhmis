import styles from './file-upload.module.scss';
import {  Button, TextField, Grid } from '@mui/material';
import { useFhirCreate, useFhirQuery } from '@ha/appfhir';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const FileBase64 = require('react-file-base64');

export interface FileUploadProps {
  onCreate?:(newResource:any)=>void,
}

let base64:any;
let mimeType:any;


export function FileUpload({onCreate}: FileUploadProps) {

  const [newData, error, createData,  ]=useFhirCreate('Binary');
  const {register,handleSubmit, control, formState:{errors,}, setValue,  setFocus }=useForm({    });
  const [results,queryerror,query,deletePatient,queryPatients]=useFhirQuery('Binary')

  console.log("results " + results);

  async function handleFileRead(event:any){
    const file = event.target.files[0]
    var rawBase64:any = await convertBase64(file)
    base64 = rawBase64.substr(rawBase64.indexOf(',') + 1);
    mimeType = rawBase64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];;
    console.log("base64 "+base64)
    console.log("mimeType "+mimeType)
  }

  async function convertBase64(file:any){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  async function onSave(formValue:any){
    ///  let newRecord= convertToResource(formValue)
      let newRecord = formValue;
      newRecord.data && ( newRecord.data = base64);
      newRecord.contentType = mimeType;
      console.log(newRecord);
      await createData(newRecord);
  }

  useEffect(()=>{
    console.log(`Data Created : `);
    console.log(newData);
    newData && newData.id && onCreate && toast.success('Record Created ');
  },[newData])


  return (
      <form onSubmit={handleSubmit(onSave)}>
          <div className={styles['container']}>
              <h1>React File Upload</h1>
              <Grid container spacing={2} >
                  <Grid item md={6}>
                      <TextField {...register('data')} type="file" id="files" name="files" inputProps={{ accept: 'image/*' }} onChange={e => handleFileRead(e)}/>
                  </Grid>
                  <Grid item md={6}>
                      <Button type='submit' variant='contained' >Upload</Button>
                  </Grid>
              </Grid>
          </div>
      </form>
  );
}

export default FileUpload;
