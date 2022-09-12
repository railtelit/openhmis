import { Container } from '@mui/material';
import ReactCodeInput, { ReactCodeInputProps } from 'react-code-input';
import styles from './code-input.module.scss';

/* eslint-disable-next-line */
export interface CodeInputProps extends ReactCodeInputProps {
    //onChange?:(value:string)=>void
    label:string,
}

export function CodeInput({label,...props}: CodeInputProps) {
  return (
    <Container>
        <ReactCodeInput  {...props} />
    </Container>
  );
}

export default CodeInput;
