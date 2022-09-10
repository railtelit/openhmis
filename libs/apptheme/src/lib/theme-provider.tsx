import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import ThemeSettings from "../layouts/full-layout/customizer/ThemeSettings";
import { configureStore } from "../redux/Store";

/* eslint-disable-next-line */
export interface ThemeProviderProps { 
     children:any[]
}

export function AppThemeProvider(props: ThemeProviderProps) {
  const theme=ThemeSettings()
  return   <ThemeProvider theme={theme}>   
                {props.children}
        </ThemeProvider>
        
}

export default AppThemeProvider;
