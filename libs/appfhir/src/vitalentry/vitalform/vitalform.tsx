import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useState } from 'react';
import BloodPressureEntry from '../blood-pressure/blood-pressure';
import TemperatureEntry from '../temperature-entry/temperature-entry';
import styles from './vitalform.module.scss';

/* eslint-disable-next-line */
export interface VitalformProps {}

export function Vitalform(props: VitalformProps) {
  const components:any = {"bloodpressure":<BloodPressureEntry/>};
  const [accstate,setAccstate]=useState<any>(Object.keys(components).reduce( (p,c,ci)=>( {...p,[c]: ci==0?true:false}  ),{} ) )

  return (
    <div className={styles['container']}>
          {accstate}
          {/* <Accordion expanded={true}> 
                                <AccordionSummary title='Blood Pressure' >Blood Pressure</AccordionSummary>
                                <AccordionDetails>
                                   <BloodPressureEntry  />
                                </AccordionDetails>
                            </Accordion>         
                            <Accordion > 
                                <AccordionSummary title='Temperature' >Temperature</AccordionSummary>
                                <AccordionDetails>
                                   <TemperatureEntry />
                                </AccordionDetails>
                            </Accordion>  */}
    </div>
  );
}

export default Vitalform;
