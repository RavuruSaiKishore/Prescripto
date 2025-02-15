import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from'./Pages/Home'
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile"
import MyAppointment from "./Pages/MyAppointment"
import Navbar from './Components/Navbar';
import Contact from "./Pages/Contact"
import Footer from './Components/Footer';
import Appointment from './Pages/Appointment';
import FranchiseDropdown from "./Components/Franchse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[6%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/franchise" element={<FranchiseDropdown />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
