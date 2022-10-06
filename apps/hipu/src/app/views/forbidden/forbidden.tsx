import { Grid, Stack, Typography } from '@mui/material';
import styles from './forbidden.module.scss';

/* eslint-disable-next-line */
export interface ForbiddenProps {}

export function Forbidden(props: ForbiddenProps) {
  return (
    <div className={styles['container']}>
          <Grid container p={5}  justifyContent={'center'} textAlign={'center'} >
                <Stack>
                       <Typography variant='h2' color={'red'}>Forbidden</Typography>
                </Stack>
          </Grid> 
    </div>
  );
}

export default Forbidden;
