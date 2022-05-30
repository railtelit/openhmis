import { Icon, Stack, Typography } from '@mui/material';
import './pagetitle.scss';

/* eslint-disable-next-line */
export interface PagetitleProps {
  icon?:string, 
  title:string
}

export function Pagetitle(props: PagetitleProps) {
  return (
    <Stack direction={'row'} alignItems={'center'}>
       {props.icon?<Icon>{props.icon}</Icon>:null}
       <Typography variant='h5'> {props.title} </Typography>
    </Stack>
  );
}

export default Pagetitle;
