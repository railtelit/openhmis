import styles from './actionbutton.module.scss';
import {useNavigate} from 'react-router-dom'
import { Button, ButtonProps } from '@mui/material';
/* eslint-disable-next-line */
export interface ActionbuttonProps  extends ButtonProps{
    label:any, 
    navigateTo?:string,     
    onClick?:()=>void,
    //type?:string,    
}

export function ActionButton({navigateTo,...props}: ActionbuttonProps) {
  const navigate = useNavigate()
  return (
      <Button   variant={props.variant||'contained'}   type={props.type||'submit'} onClick={()=>{
            props.onClick && props.onClick();
            navigateTo && navigate(navigateTo);
       }} >{props.label} </Button>
  );
}

export default ActionButton;
