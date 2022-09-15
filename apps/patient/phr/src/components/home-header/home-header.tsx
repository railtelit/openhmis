import { Avatar, Grid, Icon, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAccountService } from '../../app/hooks/accountService';
import { AppState } from '../../app/store/app.store';
import styles from './home-header.module.scss';

/* eslint-disable-next-line */
export interface HomeHeaderProps {}

export function HomeHeader(props: HomeHeaderProps) {
   const authState = useSelector((state:AppState)=>state.auth);
   const accService= useAccountService();
  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'} >
        <Grid item>
              <h1>Welcome Back... ! {authState?.userAccount?.name} </h1>
        </Grid>
        <Grid item>    
           <Link to={'profile'} >
               <IconButton>
                {authState.userAccount?.profilePhoto? 
                   <Avatar src={`data:image/png;base64,${authState.userAccount?.profilePhoto}`} ></Avatar>
                 : <Icon>profile_circle</Icon>
                 }
               </IconButton>
           </Link>        
            <Link to={'qrcode'}>
              <IconButton><Icon>qr_code_scanner</Icon></IconButton>
            </Link>
            <IconButton onClick={()=>{
               // First Confirm Then Call 
               accService.logout()
            }}><Icon>logout</Icon></IconButton>
        </Grid>
    </Grid>
  );
}

export default HomeHeader;
