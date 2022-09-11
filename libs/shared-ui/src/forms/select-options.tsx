import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './select-options.module.scss';

/* eslint-disable-next-line */
export interface SelectOptionsProps {
       options:any[],
       label:string,
       [name:string]:any
}

export function SelectOptions({options,label,...others}: SelectOptionsProps) {
  console.log(options)
  return (
    <FormControl fullWidth>
        <InputLabel> {label} </InputLabel>
      <Select fullWidth label={label||'---'} {...others} >
             {options.map(option=> <MenuItem key={option} value={option}  >{option}</MenuItem>)}
      </Select>
    </FormControl>
    
  );
}

export default SelectOptions;
