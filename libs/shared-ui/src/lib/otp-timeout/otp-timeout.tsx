import { useEffect, useState } from 'react';
import { from, interval, take } from 'rxjs';
import styles from './otp-timeout.module.scss';

/* eslint-disable-next-line */
export interface OtpTimeoutProps {
     timeout:number,
     onComplete:()=>void
}

export function OtpTimeout(props: OtpTimeoutProps) {
  const [timeleft,setTimeleft]=useState(props.timeout)
  useEffect(()=>{    
    const s = interval(1000).pipe(take(props.timeout))
     const su=  s.subscribe( {
       next: (r)=>{         
            setTimeleft((t)=> t -1  )
      },complete:()=> {
          props.onComplete()
      },}) 
       
    return ()=>{
       su.unsubscribe();
    }
  },[])
  return (
    <div className={styles['container']}>
      {timeleft>0? <span>Time Remaining : {timeleft}</span>:null }
    </div>
  );
}

export default OtpTimeout;
