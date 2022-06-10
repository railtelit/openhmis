import styles from './actionbutton.module.scss';
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';
/* eslint-disable-next-line */
export interface ActionbuttonProps {
    label:string, 
    navigateTo?:string, 
    onClick?:()=>void,
    type?:string
}

export function ActionButton(props: ActionbuttonProps) {
  const navigate = useNavigate()
  return (
      <Button type='submit' onClick={()=>{
            props.onClick && props.onClick();
            props.navigateTo && navigate(props.navigateTo);
       }} >{props.label} </Button>
  );
}

export default ActionButton;
