import { Routes, Route } from "react-router-dom";
import PatientEvaluation from "../components/patient-evaluation/patient-evaluation";
import AppointmentsHome from "./appointments-home/appointments-home";

export function AppointmentsMain () {

  return <>
<Routes>

              <Route path='/' element={<AppointmentsHome/>} />
              <Route path='/patient-evaluation/:id' element={<PatientEvaluation/>} />
           </Routes>
  </>
}


export default AppointmentsMain
