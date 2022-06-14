import { Icon, Stack, Typography } from '@mui/material';
import './pagetitle.scss';

/* eslint-disable-next-line */
export interface PagetitleProps {
  icon?:string, 
  title:string
}

export function Pagetitle(props: PagetitleProps) {
  return (
    <Stack direction={'row'} alignContent='center' alignItems={'center'} spacing={1}>
       {props.icon?<Icon>{props.icon}</Icon>:null}
       <Typography fontWeight={'bolder'} variant='h4'> {props.title} </Typography>
    </Stack>
  );
}

export default Pagetitle;
