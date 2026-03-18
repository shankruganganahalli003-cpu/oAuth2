import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Get worker profile if exists
  const getProfile = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/worker/getme", {
        withCredentials: true,
      });

      if (data.success) {
        setProfile(data.get[0] || null); // first profile if exists
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    if (user?.role === "worker") getProfile();
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Profile Image */}
      {profile && (
        <div className="flex w-full justify-end p-4">
          <img
            className="w-12 h-12 mr-2 cursor-pointer rounded-full object-cover border-2 border-orange-400"
            onClick={() => navigate("/worker-dashboard")}
            src={profile.image || "/default-avatar.png"}
            alt={user?.name || "Profile"}
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center p-10 gap-6">
        <h1 className="text-5xl font-bold animate-bounce">
          <span className="text-orange-500">दक्ष</span>{" "}
          <span className="text-white bg-green-600 px-2 rounded">भारत</span>
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome, {user?.name}
        </h2>

        <p className="max-w-2xl text-gray-600 text-lg">
          दक्ष भारत is a digital platform that connects skilled workers with
          people who need their services. Our goal is to create more employment
          opportunities and help people easily find trusted workers for their
          daily needs.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mt-4">
          {user?.role === "user" && (
            <button
              onClick={() => navigate("/all-workers")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              Show Workers
            </button>
          )}

          {user?.role === "worker" && !profile && (
            <button
              onClick={() => navigate("/post-job")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              Create Worker Profile
            </button>
          )}

          {user?.role === "worker" && profile && (
            <button
              onClick={() => navigate("/notification")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              Get Notifications
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 p-10">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-orange-600 mb-2">
            Find Skilled Workers
          </h3>
          <p className="text-gray-600">
            Easily search and connect with skilled workers such as plumbers,
            electricians, carpenters, and many more.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">
            Post Jobs Quickly
          </h3>
          <p className="text-gray-600">
            Post your work requirements and get responses from available
            workers near your location.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-orange-600 mb-2">
            Trusted Platform
          </h3>
          <p className="text-gray-600">
            We aim to build a trusted ecosystem where both workers and
            customers benefit from transparent opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;