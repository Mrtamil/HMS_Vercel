import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InPatient from './Receiption/InPatient'
import Navbar from './Receiption/NavBar';
import OutPatient from "./Receiption/OutPatient";
import Sidebar from './Receiption/SideBar';
import BloodBankDashboard from './Receiption/BloodBank';
import DoctorsList from './Receiption/DoctorsList';
import Drugs from './Receiption/Pharmacy';
import AllAppointments from './Receiption/AllAppointment';



function App() {

  return (
    <>
    <Navbar />
    <div className='flex items-start'>
        <Sidebar />
        <div className="w-full p-4">
            <Routes>
                <Route path="inpatients" element={<InPatient />} />
                <Route path="outpatients" element={<OutPatient />} />
                <Route path="all-doctors" element={<DoctorsList />} />
                <Route path="all-appointment" element={<AllAppointments/>} />
                <Route path="blood-bank" element={<BloodBankDashboard />} />
                <Route path="pharmacy" element={<Drugs />} />
            </Routes>
        </div>
    </div>
</> 
  )
}

export default App
