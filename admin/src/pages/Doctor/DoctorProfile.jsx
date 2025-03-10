import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData,backendUrl} = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async() =>{
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}});
      if(data.success){
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      }
      else{
        toast.error(error.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() =>{
    if(dToken){
      getProfileData();
    }
  },[dToken]);

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg shadow-md hover:shadow-xl hover:scale-97 transition-all duration-300' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/*  docInfo : name, degree, experience */}
          <p className='flex items-center gap-2 text-3xl font-medium text-primary'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border border-gray-400 text-sm rounded-full hover:bg-primary hover:text-white'>{profileData.experience}</button>
          </div>

          {/*  Doc About */}
          <div >
            <p className='flex items-center gap-1 text-md font-medium text-neutral-800 mt-3'>About : </p>
            <p className='text-md text-gray-800 max-w-[700px] mt-1'> {profileData.about} </p>
          </div>

          <p 
            className='text-gray-700 mt-4'>Appointment Fees : 
            <span className='text-gray-900'>{currency}
            { isEdit 
              ?  <input type='number' onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees}/> 
              : profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p className='text-gray-700'>Address : </p>
            <p>
              { isEdit ? <input type='text' onChange={(e) =>setProfileData(prev => ({...prev,address:{...prev.address, line1: e.target.value}}))} value={profileData.address.line1}/> :profileData.address.line1} 
              <br /> 
              { isEdit ? <input type='text' onChange={(e) =>setProfileData(prev => ({...prev,address:{...prev.address, line2: e.target.value}}))} value={profileData.address.line2}/> :profileData.address.line2} 
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input className='cursor-pointer' onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available})) } checked={profileData.available} type="checkbox" name=''/>
            <label className='cursor-pointer' htmlFor="">Available</label>
          </div>

          {
            isEdit 
            ?  <button onClick={updateProfile} className='px-4 py-2 border border-primary text-sm rounded-md mt-5 hover:bg-primary hover:text-white transition-all'>Save Profile</button>
            : <button onClick={() => setIsEdit(true)} className='px-4 py-2 border border-primary text-sm rounded-md mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
 
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
