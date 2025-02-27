import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/SuperAdmin/Dashboard';
import AllAppointments from './pages/SuperAdmin/AllAppointment';
import AddDoctor from './pages/SuperAdmin/AddDoctor';
import DoctorsList from './pages/SuperAdmin/DoctorsList';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import Logins from './pages/Logins';
import BloodBankDashboard from './pages/SuperAdmin/BloodBank';
import Drugs from './pages/SuperAdmin/Pharmacy';
import PatientsAttended from './pages/Doctor/PatientsAttend';

const App = () => {
    const { dToken } = useContext(DoctorContext);
    const { aToken } = useContext(AdminContext);

    return dToken || aToken ? (
        <div className='bg-[#F8F9FD]'>
            <ToastContainer />
            <Navbar />
            <div className='flex items-start'>
                <Sidebar />
                <Routes> 
                    <Route path="admin-dashboard" element={<Dashboard />} />
                    <Route path="all-appointments" element={<AllAppointments />} />
                    <Route path="add-doctor" element={<AddDoctor />} />
                    <Route path="doctor-list" element={<DoctorsList />} />
                    <Route path="doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="doctor-appointments" element={<DoctorAppointment />} />
                    <Route path="doctor-profile" element={<DoctorProfile />} />
                    <Route path="bloodbank" element={<BloodBankDashboard />} />
                    <Route path="pharmacy" element={<Drugs />} />
                    <Route path="patients-attended" element={<PatientsAttended />} />
                </Routes>
            </div>
        </div>
    ) : (
        <>
            <ToastContainer />
            <Logins />
        </>
    );
}

export default App;

