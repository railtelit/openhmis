import { T } from '@ha/shared-ui';
import { Card, Divider, Typography } from '@mui/material';
import styles from './admin-control-card.module.scss';

/* eslint-disable-next-line */
export interface AdminControlCardProps {
    title:string,icon?:string,roleName?:string
}

export function AdminControlCard(props: AdminControlCardProps) {
  return (
    //  Use Query Provider 
      <Card>
          <T text={props.title} />
          <Divider/>
      </Card>
  );
}

export default AdminControlCard;
