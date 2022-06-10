import { Stack, Icon, Typography } from '@mui/material';
import styles from './vital-sign.module.scss';

/* eslint-disable-next-line */
export interface VitalSignProps {icon: string;
      text: string;
      color?:string}

export function VitalSign(props: VitalSignProps) {
  return  <Stack alignItems={'center'}  >
          <Icon>{props.icon}</Icon>
          <Typography variant='caption' sx={{fontWeight:'bold'}}>{props.text}</Typography>
        </Stack>
  
}

export default VitalSign;
