import { Button, Card, CardContent, Container, Grid, Stack, TextField } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useApiService } from '../../hooks/useApiService';
import styles from './login.module.scss';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const auth=useContext(AuthContext); 
  const apiservice=useApiService();  
  return (
    <Container>
      <div className={styles['container']}>
        <Card>
          <CardContent>
            <Grid container>
                <Grid item md={12}>
                    <h1>Lets Login!</h1>
                </Grid>
                <Grid item md={12} justifyContent={'center'} >
                      <Stack width={'100%'} >
                      <TextField fullWidth label={'MOBILE NUMBER'}  />                      
                      <Stack  direction={'row'} justifyContent={'end'}>
                          <Button variant='contained' >NEXT</Button>
                      </Stack>
                      </Stack>
                </Grid>
            </Grid>
          </CardContent>
        </Card>

      </div>
    </Container>
  );
}

export default Login;
