import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
        components:{
            MuiTextField:{
                defaultProps:{
                    variant:'filled',
                    InputLabelProps:{ 
                            shrink:true
                     }                    
                }
            }
        }
})