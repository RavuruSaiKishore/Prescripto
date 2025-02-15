import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg text-sm space-y-5"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer relative">
              <img
                className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-gray-200 hover:opacity-80 transition-all"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <img
                className="absolute bottom-2 right-2 w-10"
                src={assets.upload_icon}
                alt="Upload Icon"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-full object-cover shadow-md"
              src={userData.image}
              alt="Profile"
            />
          )}
        </div>

        {/* Name */}
        <div className="text-center">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              className="text-3xl font-medium bg-gray-100 rounded-md px-3 py-1 text-center"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-3xl font-semibold text-gray-800">
              {userData.name}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 font-semibold mb-2">
            CONTACT INFORMATION
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-blue-500">{userData.email}</span>
            </p>
            <p>
              <span className="font-medium">Phone:</span>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  className="ml-2 px-2 py-1 bg-white rounded border border-gray-300"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <span className="ml-2 text-blue-500">{userData.phone}</span>
              )}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 font-semibold mb-2">BASIC INFORMATION</p>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Gender:</span>
              {isEdit ? (
                <select
                  className="ml-2 bg-white border border-gray-300 rounded px-2 py-1"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className="ml-2 text-gray-600">{userData.gender}</span>
              )}
            </p>
            <p>
              <span className="font-medium">Birthday:</span>
              {isEdit ? (
                <input
                  type="date"
                  className="ml-2 px-2 py-1 bg-white rounded border border-gray-300"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <span className="ml-2">{userData.dob}</span>
              )}
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="text-center mt-5">
          {isEdit ? (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="px-6 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    )
  );
};

export default MyProfile;
