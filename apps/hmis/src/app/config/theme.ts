import { createTheme, ThemeOptions } from "@mui/material";


export const themeOptions: ThemeOptions =  {
  palette: {
    mode: 'light',
    primary: {
        main: '#6d0f68',
      },
      secondary: {
        main: '#f50057',
      },
  },
  components:{  }
};

export const AppTheme=createTheme(themeOptions);