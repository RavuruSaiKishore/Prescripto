import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, setAppointments, getAllAppointments,cancelAppointment } =useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row - Ensure grid template matches the data rows */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700 bg-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Data & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] flex flex-wrap items-center py-3 px-6 border-b hover:bg-gray-50 text-gray-500"
          >
            <p>{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={item.userData.image}
                alt="userImage"
              />
              <p>{item.userData.name}</p>
            </div>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt="doctorImage"
              />
              <p>{item.docData.name}</p>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>

            <div className="flex justify-center">
              {item.cancelled 
                ? <p className="text-red-400 text-xs font-medium"> Cancelled</p> 
                : item.isCompleted 
                  ? <p className="text-green-500 text-xs font-medium">Completed</p>
                  : <img onClick={() => cancelAppointment(item._id)} className="cursor-pointer w-12" src={assets.cancel_icon} alt="Cancel"/>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
