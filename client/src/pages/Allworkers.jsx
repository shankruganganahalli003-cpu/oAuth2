import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEye, FaMapMarkerAlt, FaTools, FaBirthdayCake, FaMars, FaVenus, FaAlignLeft } from "react-icons/fa";

const Allworkers = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/worker/getall",
        { withCredentials: true }
      );
      if (data.success) setWorkers(data.getall);
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to fetch workers");
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        All Workers
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <div
              key={worker._id}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              {/* TOP GRADIENT */}
              <div className="h-28 bg-gradient-to-r from-orange-400 to-pink-500"></div>

              {/* PROFILE IMAGE */}
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
                <img
                  className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  src={worker.image || "/default-avatar.png"}
                  alt={worker.name || "worker"}
                />
              </div>

              {/* CONTENT */}
              <div className="pt-20 pb-6 px-6 flex flex-col items-start space-y-2">
                {/* Name */}
                <h2 className="text-2xl font-bold text-gray-800">{worker.name || "Worker"}</h2>

                {/* Description (desc) */}
                {worker.desc && (
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <FaAlignLeft className="text-gray-400" /> {worker.desc}
                  </p>
                )}

                {/* Location */}
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <FaMapMarkerAlt className="text-orange-500" /> {worker.city}, {worker.state}
                </p>

                {/* Skills */}
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <FaTools className="text-blue-500" /> {worker.skills}
                </p>

                {/* Phone */}
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <FaPhoneAlt className="text-green-500" /> {worker.phone}
                </p>

                {/* DOB & Gender */}
                <p className="text-gray-500 text-xs flex items-center gap-2">
                  <FaBirthdayCake className="text-pink-400" /> {worker.dob} •{" "}
                  {worker.gender === "Male" ? (
                    <FaMars className="text-blue-500" />
                  ) : worker.gender === "Female" ? (
                    <FaVenus className="text-pink-500" />
                  ) : null}
                </p>

                {/* ACTION BUTTONS */}
                <div className="w-full flex gap-5 mt-4 items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${worker.phone}`;
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
                  >
                    <FaPhoneAlt /> Call
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/worker/${worker._id}`);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
                  >
                    <FaEye /> View
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">No workers found</p>
        )}
      </div>
    </div>
  );
};

export default Allworkers;