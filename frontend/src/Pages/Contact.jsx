import React from 'react'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-semibold underline'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-md' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-gray-600 text-lg'>Our <span className='font-bold'>OFFICE</span></p>
          <p className='text-gray-500'>54709 Wiliam Station  <br />Suite 350, WashingTon, USA</p>
          <p className='text-gray-500'>Tel:(415) 555-01234 <br /> Email : Kishore@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Career At Prescripto</p>
          <p className='text-gray-600'>Learn More About Out Teams And Job Openings</p>

          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:rounded-md hover:text-white transition-all  duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
