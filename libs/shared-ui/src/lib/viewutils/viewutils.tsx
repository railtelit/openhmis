import { styled, TextField, TextFieldProps, Typography, TypographyProps } from '@mui/material';

import styles from './viewutils.module.scss';

/* eslint-disable-next-line */
export interface ViewutilsProps {}

export const T=({text,...props}:TypographyProps&{text:string})=><Typography>{text}</Typography>


export const TF=(  props:TextFieldProps )=><TextField fullWidth {...props} variant={'filled'} />