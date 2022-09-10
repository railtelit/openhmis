import { Button, TypographyProps } from "@mui/material"
import React, { Suspense, useState } from "react";

export function Loader(){ 
    const  CE =React.lazy(()=>import('@mui/material/Typography'))
    const  [E,setE]=useState<any>(); 
    const [P,setP]=useState<TypographyProps>({variant:'h1'})
     
     async function loadElement(){
         const e =  React.lazy(()=>import('@mui/material/Alert')); 
         console.log(e)
         setE(e)
    }

        return (
            
            <>
            <Button onClick={()=>{
            // 
            loadElement()
        }}>Load Element</Button>
        Element : 
        <Suspense fallback={<div>Loading...</div>}>      
              {E?  <E  {...P} children={'Test inside'}/> : 'Waiting for Click' }
        </Suspense>
        <div />
            </>
        );
}