import styles from './qrcode.module.scss';
import QR from 'react-qr-code'
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/app.store';
/* eslint-disable-next-line */
export interface QrcodeProps {
   
}

export function Qrcode(props: QrcodeProps) {
  const account=useSelector((state:AppState)=>state.auth)
  return (
    <div className={styles['container']}>
        <Grid container p={5} justifyContent={'center'} >
               GET QRCODE FROM API 
        </Grid>
         {/* <QR value={account.userAccount.qr} ></QR> */}
    </div>
  );
}

export default Qrcode;
