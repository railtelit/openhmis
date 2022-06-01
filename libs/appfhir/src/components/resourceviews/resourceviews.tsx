import styles from './resourceviews.module.scss';
import React from 'react'
import {HumanName} from 'fhir/r4'
export interface ResourceNameProps extends HumanName{
     defaultText:string
}
export function ResourceName  ( name:ResourceNameProps ) {
  return (
      <div> {name?.family} {name?.given} {name?.text} {name?.defaultText} </div>
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
