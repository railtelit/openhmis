import { setState } from '@ha/common';
import { Button, ButtonProps } from '@mui/material';
import { useDispatch } from 'react-redux';
import styles from './action-button.module.scss';

/* eslint-disable-next-line */
export interface ActionButtonProps   {
     stateName?:string
     onClick?:()=>void,
     stateData?:()=>any,
    
}

export function StateActionButton({stateName,onClick,stateData,...props}: ActionButtonProps & ButtonProps) {
  const dispatch=useDispatch()
  return (
     <Button {...props} onClick={()=>{
        
        stateName && dispatch(setState({[stateName]: stateData?.()||{} }) ); 
        
        onClick && onClick();
     }} >
        {props?.children}
     </Button>
  );
}

export default StateActionButton;
