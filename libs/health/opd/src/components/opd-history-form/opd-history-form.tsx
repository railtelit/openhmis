import { Pagetitle } from '@ha/shared-ui';
import { Stack, TextField } from '@mui/material';
import styles from './opd-history-form.module.scss';

/* eslint-disable-next-line */
export interface OpdHistoryFormProps {}

export function OpdHistoryForm(props: OpdHistoryFormProps) {
  const HISTORY_FIELDS:string[]=
      ['CVS','RS','CNS','PA','GENERAL ADMINISTRATION','MUSCULAR ADMINISTRATION','LOCAL ADMINISTRATION']; 
  return (
    <div className={styles['container']}>
        <Pagetitle title='Examination'  />
        <Stack spacing={2}>
          {HISTORY_FIELDS.map(f=>
                  <TextField fullWidth multiline={true} rows={2}   label={f} key={f} />
            )}
        </Stack>
           
    </div>
  );
}

export default OpdHistoryForm;
