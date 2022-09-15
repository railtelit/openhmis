import styles from './qrcode.module.scss';
import QR from 'react-qr-code'
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/app.store';
import { useAccountService } from '../../../hooks/accountService';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface QrcodeProps {
   
}

export function Qrcode(props: QrcodeProps) {
  const account=useSelector((state:AppState)=>state.auth); 
  const accservice=useAccountService(); 
  const [qrCode,setqrCode]=useState<any>(null)
  useEffect(()=>{
       accservice.loadQrcode().then(v=> {
            //setqrCode(Buffer.from(v,'binary').toString('base64'));
             setqrCode(v)
       })
  },[])
  return (
    <div className={styles['container']}>
        <Grid container p={5} justifyContent={'center'} >
                {qrCode?<img  src={`data:image/png;base64,${qrCode}`} alt={'QRCODE'} />:'QRCODE'}
        </Grid>
         {/* <QR value={account.userAccount.qr} ></QR> */}
    </div>
  );
}

export default Qrcode;
