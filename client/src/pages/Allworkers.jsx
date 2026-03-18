import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaTools, FaBirthdayCake, FaMars, FaVenus, FaAlignLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Allworkers = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  const fetchWorkers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/worker/getall", { withCredentials: true });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800">
        All Workers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <div
              key={worker._id}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group w-full"
            >
              {/* TOP GRADIENT */}
              <div className="h-24 sm:h-28 bg-gradient-to-r from-orange-400 via-pink-400 to-pink-500"></div>

              {/* PROFILE IMAGE */}
              <div className="absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2">
                <img
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                  src={worker.image || "/default-avatar.png"}
                  alt={worker.name || "worker"}
                />
              </div>

              {/* CONTENT */}
              <div className="pt-24 sm:pt-28 pb-6 px-4 sm:px-8 flex flex-col items-start space-y-2 sm:space-y-3 w-full">
                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{worker.name || "Worker"}</h2>

                {/* Description */}
                {worker.desc && (
                  <div className="w-full bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 p-2 sm:p-3 rounded-xl shadow-inner flex items-start gap-2 text-gray-700 font-medium text-sm sm:text-base">
                    <FaAlignLeft className="text-gray-400 mt-1" />
                    <span>{worker.desc}</span>
                  </div>
                )}

                {/* Info Boxes */}
                <div className="w-full grid grid-cols-1 gap-2 sm:gap-3 mt-3">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm sm:text-base">
                    <FaMapMarkerAlt className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" /> {worker.city}, {worker.state}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm sm:text-base">
                    <FaTools className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" /> {worker.skills}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm sm:text-base">
                    <FaBirthdayCake className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" /> {worker.dob} •{" "}
                    {worker.gender === "Male" ? (
                      <FaMars className="text-blue-500" />
                    ) : worker.gender === "Female" ? (
                      <FaVenus className="text-pink-500" />
                    ) : null}
                  </div>
                </div>

                {/* View Button */}
                <div className="w-full mt-3">
                  <button
                    onClick={() => navigate(`/worker/${worker._id}`)}
                    className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg shadow hover:bg-orange-600 transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg mt-6">No workers found</p>
        )}
      </div>
    </div>
  );
};

export default Allworkers;