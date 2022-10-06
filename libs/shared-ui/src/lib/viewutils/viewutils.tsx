import { styled, Typography, TypographyProps } from '@mui/material';

import styles from './viewutils.module.scss';

/* eslint-disable-next-line */
export interface ViewutilsProps {}

export const T=({text,...props}:TypographyProps&{text:string})=><Typography>{text}</Typography>
