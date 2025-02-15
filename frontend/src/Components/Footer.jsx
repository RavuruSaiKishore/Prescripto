import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*  left section */}
        <div className="">
          <img className="mb-5 w-35" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-900 leading-6">
            Your Trusted Doctor Appointment Platform Prescripto is a convenient and
            reliable online platform designed to simplify doctor appointments.
            We connect patients with experienced healthcare professionals,
            allowing seamless booking, secure consultations, and hassle-free
            management of medical appointments. Whether you need a routine
            check-up or specialized care, Prescripto ensures a smooth and
            efficient experience.
          </p>
        </div>
        {/*  Center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-900">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/*  right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="text-gray-900">
            <li>+1-222-333-444-555</li>
            <li>Kishore@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*  Copy Right text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Prescripto - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer
