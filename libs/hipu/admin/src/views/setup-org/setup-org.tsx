import { setState, useApiState } from '@ha/common';
import { StateActionButton } from '@ha/shared-ui';

import { AppBar, Button, Card, CardContent, Container, Grid, Icon, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AdminState } from '../../admin.store';
import styles from './setup-org.module.scss';

/* eslint-disable-next-line */
export interface SetupOrgProps {}

const OrgCard=({org}:any)=><Card>
      <CardContent>
          <Stack>
            <Typography variant='h6'> {org?.orgname} </Typography>
            <Typography variant='caption'> {org?.orgtype} </Typography>

          </Stack>
      </CardContent>
</Card>

export function SetupOrg(props: SetupOrgProps) {
  const state = useSelector((state:AdminState)=>state.common  )
  const setAction=useDispatch()
  const orgState = useApiState<any[]>('orgs',{processGroup:'admin'});
  return (
    <div className={styles['container']}>
      <Container>
        
          <Grid container justifyContent={'space-between'}>
               <Typography variant='h6'>Organisation Hierarchy</Typography>
               <Link  to={'..'}  > 
                  <IconButton   ><Icon>undo</Icon></IconButton>
                </Link>
          </Grid>        
      </Container>
      {orgState.state && orgState.state.map(org=> <OrgCard key={org?.id} org={org} /> )}
    </div>
  );
}

export default SetupOrg
