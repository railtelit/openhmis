import { T } from '@ha/shared-ui';
import { Box, Button, Card, Divider, Icon, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './admin-control-card.module.scss';

/* eslint-disable-next-line */
export interface AdminControlCardProps {
    title:string,icon?:string,roleName?:string,managelink?:string
}

export function AdminControlCard(props: AdminControlCardProps) {
  const nav=useNavigate()
  return (
    //  Use Query Provider 
      <Card>
          <Box flex={1} display={'flex'}  >
              <Icon>{props.icon}</Icon>
              <T text={props.title} />
          </Box>
          <Divider/>
          <Stack spacing={2}>
                <Button onClick={()=>nav(props.managelink||'')}  >MANAGE</Button>
          </Stack>
      </Card>
  );
}

export default AdminControlCard;
