import { Routes, Route } from "react-router-dom";
import PatientEvaluation from "../components/patient-evaluation/patient-evaluation";
import MainInfo from "../components/main-info/main-info";
import AppointmentsHome from "./appointments-home/appointments-home";
import Clinical from "../components/clinical/clinical";
import Mental from "../components/mental/mental";
import DxProcedures from "../components/dx-procedures/dx-procedures";
import Validation from "../components/validation/validation";
import Administrative from "../components/administrative/administrative";

export function AppointmentsMain () {

  return <>
    <Routes>
      <Route path='/' element={<AppointmentsHome/>} />
      <Route path='patient-evaluation/:patientName' element={<PatientEvaluation/>} />
      <Route path='main-info' element={<MainInfo/>} />
      <Route path='clinical' element={<Clinical/>} />
      <Route path='mental' element={<Mental/>} />
      <Route path='dx-procedures' element={<DxProcedures/>} />
      <Route path='validation' element={<Validation/>} />
      <Route path='administrative' element={<Administrative/>} />
    </Routes>
  </>
}


export default AppointmentsMain
