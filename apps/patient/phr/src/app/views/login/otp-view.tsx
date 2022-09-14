import { OtpTimeout } from "@ha/shared-ui"
import { Button } from "@mui/material"
import { useState } from "react"
import ReactCodeInput from "react-code-input"

export interface OTPViewProps {
        onChange:(value:string)=>void
}
export const OTPView=(props:OTPViewProps)=>{

    const [showResend,setshowResend]=useState(false)
    return <>        
          <label >Enter OTP</label> 
          <ReactCodeInput inputStyle={{fontSize:20}}  key={'otp'} type={'number'} fields={6} name={'otp'} 
                onChange={(value)=>{
                    props.onChange(value)
                }}   inputMode={'numeric'} />
          <div>
                <OtpTimeout  timeout={60} onComplete={()=>{
                      setshowResend(t=>true)
                }} />      
                {showResend?<Button>Resend OTP</Button>:<></>}
          </div>
          </> 
    }

