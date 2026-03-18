import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { 
  UserIcon, CalendarIcon, PhoneIcon, MapPinIcon,
  BuildingLibraryIcon, FlagIcon, AcademicCapIcon, InformationCircleIcon
} from '@heroicons/react/24/outline';
import { FaPhoneAlt, FaEye } from "react-icons/fa";

const OneWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

  const getOneWorker = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/worker/getid/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        setWorker(data.find);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getOneWorker();
  }, []);

  if (!worker) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Profile Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Top Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-orange-400 to-pink-500"></div>

          {/* Profile Image */}
          <div className="flex justify-center -mt-20">
            <img
              src={worker.image || "/default-avatar.png"}
              alt={worker.name}
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Name */}
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-gray-800">{worker.name}</h1>
          </div>

          {/* Super Styled Description */}
          {worker.desc && (
            <div className="mx-6 mt-4 p-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-2xl shadow-inner text-gray-800 text-lg font-medium text-center animate-pulse">
              {worker.desc}
            </div>
          )}

          {/* Worker Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-6 text-gray-700">
            <p className="flex items-center gap-2 font-medium">
              <UserIcon className="w-5 h-5" /> Gender: {worker.gender}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <CalendarIcon className="w-5 h-5" /> DOB: {worker.dob}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <PhoneIcon className="w-5 h-5" /> Phone: {worker.phone}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <MapPinIcon className="w-5 h-5" /> Address: {worker.location}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <BuildingLibraryIcon className="w-5 h-5" /> City: {worker.city}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <MapPinIcon className="w-5 h-5" /> State: {worker.state}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <FlagIcon className="w-5 h-5" /> Country: {worker.country}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <AcademicCapIcon className="w-5 h-5" /> Skills: 
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{worker.skills}</span>
            </p>
            <p className="flex items-center gap-2 font-medium">
              <InformationCircleIcon className="w-5 h-5" /> User ID: {worker.userId}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <InformationCircleIcon className="w-5 h-5" /> Worker ID: {worker._id}
            </p>
          </div>

          {/* Action Buttons: Call & View */}
          <div className="flex justify-center gap-6 my-6">
            {/* Call Button */}
            <button
              onClick={() => window.location.href = `tel:${worker.phone}`}
              className="flex items-center gap-2 cursor-pointer bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 transition"
            >
              <FaPhoneAlt /> Call
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 cursor-pointer text-white px-6 py-2 rounded-xl shadow hover:bg-gray-600 transition"
            >
              ← Back
            </button>
          </div>

     

        </div>
      </div>
    </div>
  );
};

export default OneWorker;