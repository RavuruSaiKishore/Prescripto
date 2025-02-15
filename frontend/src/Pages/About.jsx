import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About{" "}
          <span className="text-gray-900 font-bold underline"> US </span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full max-w-[360px] rounded-md"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome To Prescripto, Your Patner In Managing Your HealthCare Needs
            Convinently And Effectively. At Prescripto, We Understand The
            Challenges Individual Face When It Comes To Scheduling Doctor
            Appointments And Managing Their Health Records.
          </p>
          <p>
            Prescripto Is Committed To Excellence In HealthCare Technology. We
            Continuously Strive to Enhance Our platform. Integrating The Latest
            Advancements To Improve the User Exprience And Deliver Superior
            Service. Whether, You'import from 'react-redux' You Are Booking Your
            First Appointment Or Managing Ongoing Care. Prescripto Is Here To
            Support You Every Step Of Teh Way.
          </p>
          <b className="text-gray-800 text-lg">Our Vision</b>
          <p>
            Our Vision At Prescripto Is To Create A Seamless HealthCare
            Exprience For Every User. We Aim To Bridge The Gap Between Patients
            And The HealthCare Providers.Making It Is Easier For You To Access
            The Care Your Need, When You Need It.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          {" "}
          <span className='text-gray-900 font-bold text-[25px]'>Why</span>{" "}
          <span className="text-gray-600 font-semibold hover:underline">
            Choose Us
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency : </b>
          <p>
            Stramlined Appointment Scheduling.
            <br /> Keep meals simple with quick-prep <br /> ingredients and
            batch cooking on weekends. Combine activities <br /> like walking
            meetings or audiobooks during commutes to maximize time. Use digital
            tools and automation for routine tasks, freeing up time for what
            matters most.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience : </b>
          <p>
            {" "}
            Access To A Network Or Trusted HealthCare Professionals In Your Area
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization : </b>
          <p>
            Tailored Recommandations And remainders To Help You Stay On Top Of
            Your Health
          </p>
        </div>
      </div>
    </div>
  );
}

export default About
