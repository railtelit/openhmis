import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState, AuthState } from '../../../store/app.store';
import styles from './manage-profile.module.scss';

/* eslint-disable-next-line */
export interface ManageProfileProps {}

export function ManageProfile(props: ManageProfileProps) {
  const auth=useSelector((state:AppState)=>state.auth)
  return (
    <div className={styles['container']}>
      <Card>
        <CardContent>
            <Stack spacing={2} gap={2} >
           <Typography>
                HealthId Number : { auth.userAccount?.healthIdNumber }
           </Typography>
           <Typography>
                Email : { auth.userAccount?.email }
           </Typography>
           <Typography>
                Address : { auth.userAccount?.address }
           </Typography>
           <Typography>
              KYC Verified : {auth.userAccount?.kyc_verified?'Yes':'No'}
           </Typography>
             
        </Stack>
        </CardContent>
        <Link to={'/account'}>
             <Button>BACK</Button>
        </Link>
      </Card>
    </div>
  );
}

export default ManageProfile;
