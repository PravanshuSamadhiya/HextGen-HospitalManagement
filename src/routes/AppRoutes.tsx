import { GetADemoForm } from "@/pages/GetDemoForm";
import Home from "@/pages/Home";
import Clinic from "@/pages/solutions/Clinic";
import HospitalManagement from "@/pages/solutions/HospitalManagement";
import PolyClinic from "@/pages/solutions/PolyClinic";
import { Routes, Route } from "react-router-dom";


const AppRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/solutions/hospital" element={<HospitalManagement/>} />
          <Route path="/solutions/polyclinic" element={<PolyClinic/>} />
          <Route path="/solutions/clinic" element={<Clinic/>} />
          <Route path="/contact" element={<GetADemoForm/>} />
        </Routes>
    )
}

export default AppRoutes;