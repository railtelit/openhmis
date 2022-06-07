import styles from './resourceviews.module.scss';
import React from 'react'
import {HumanName,ContactPoint} from 'fhir/r4'
import { Typography } from '@mui/material';
export interface ResourceValueProps {
     value:any
}
export interface ResourceNameProps extends HumanName{
     defaultText:string
}
export interface ResourceContactProps extends ContactPoint{
    showIcon?:false
}
export function ResourceName  ( name:ResourceNameProps ) {
  return (
      <div> {name?.family} {name?.given} {name?.text} {name?.defaultText} </div>
  )
}


export const ActiveStatus = ( status:ResourceValueProps ) => {
  return (
    <Typography color={status.value?'primary':'error'} >  {status.value?'Active':'Inactive'} </Typography>
  )
}
export const ResourceContactPoint = ( contact:ResourceContactProps ) => {
  return (
    <Typography   >  {contact.value} </Typography>
  )
}



/* eslint-disable-next-line */
export interface ResourceviewsProps {}

export function Resourceviews(props: ResourceviewsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Resourceviews!</h1>
    </div>
  );
}

export default Resourceviews;
