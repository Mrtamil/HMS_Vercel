import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Navbar from './component/NavBar';
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login';
import About from './pages/About'
import Contact from './pages/Contact'
import MyAppointments from './pages/MyAppointment';
import Appointment from './pages/Appointment'
import MyProfile from './pages/MyProfile'
import Footer from './component/Footer';
import BloodBankDashboard from './pages/BloodBank';
import PatientDailyTasks from './pages/DailyTask';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/blood-bank' element={<BloodBankDashboard/>} />
        <Route path='/daily-task' element={<PatientDailyTasks/>} />
        
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App