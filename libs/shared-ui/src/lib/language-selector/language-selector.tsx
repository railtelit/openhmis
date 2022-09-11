import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
 

/* eslint-disable-next-line */
export interface LanguageSelectorProps {
    onChange:(value:string)=>void
}

export function LanguageSelector(props: LanguageSelectorProps) {
  const LANGUAGE_OPTIONS:any={en:'English',hi:'नमस्ते','tg':"తెలుగు"}; 
  const [lang,setLang]=useState(localStorage.getItem('language')); 
  
  return (
      //  This At Top : 
      
      <div>         
            <Select defaultValue={'en'} onChange={(e)=>{ 
                  props.onChange(e.target.value)
            }}>
                {Object.keys(LANGUAGE_OPTIONS).map(k=> <MenuItem key={k} value={k}> {LANGUAGE_OPTIONS[k]} </MenuItem> )}
            </Select>
      </div>
  );
}

export default LanguageSelector;
