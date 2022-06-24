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

export function ActionButton(props: ActionbuttonProps) {
  const navigate = useNavigate()
  return (
      <Button {...props}     type={props.type||'submit'} onClick={()=>{
            props.onClick && props.onClick();
            props.navigateTo && navigate(props.navigateTo);
       }} >{props.label} </Button>
  );
}

export default ActionButton;
