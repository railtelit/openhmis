

import { Button } from '@mui/material';
import React from 'react'
import jsreport from '@jsreport/browser-client'
import dayjs from 'dayjs';
export const TestReport = () => {
    async function runReport(){ 
        console.log('Loading Jsreport '); 
        //(jsreport as any).serverUrl='http://localhost:5488/jsreport'
        (jsreport as any).serverUrl='http://openhmis.erpapps.in'
         const report = await jsreport.render({
          template: {
            content: 'Hello from :  {{message}} : Time : {{time}}',
            engine: 'handlebars',
            recipe: 'chrome-pdf'
          },
          data: {
            message: 'OPEN HMIS - APPLICATION ',
            time: dayjs()
          }
        })
        //report.download('myreport.pdf'); 
        report.openInWindow();
     }
      
     
  return (
    <Button onClick={()=>runReport()}>Test Report</Button>
  )
}
