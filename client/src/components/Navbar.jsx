import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [nav, setNav] = useState(false);

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setNav(!nav)}
        className="fixed top-4 left-4 z-50 cursor-pointer bg-orange-500 text-white px-3 py-2 rounded-lg shadow"
      >
        ☰
      </button>

      {nav && <div onClick={() => setNav(false)} className="fixed inset-0 bg-black/30 z-40"></div>}

      <div
        className={`fixed top-0 left-0 w-52 h-screen bg-gradient-to-b from-orange-500 via-white to-green-500 flex flex-col items-center shadow-xl transform transition-transform duration-300 z-50 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="text-xl font-bold w-full text-center py-5 border-b border-gray-300 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-orange-600">दक्ष</span>{" "}
          <span className="text-green-700">भारत</span>
        </div>

        <div className="flex flex-col gap-4 w-full px-4 mt-8">
          <button onClick={() => navigate("/")} className="w-full bg-white py-2 rounded-lg shadow hover:scale-105 transition">🏠 Home</button>
          <button onClick={() => navigate("/post-job")} className="w-full bg-white py-2 rounded-lg shadow hover:bg-orange-200 transition">📢 Post Job</button>
          <button onClick={() => navigate("/workers")} className="w-full bg-white py-2 rounded-lg shadow hover:bg-green-200 transition">👷 Workers</button>
          <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600 transition">🔒 Logout</button>
        </div>

        {user && (
          <div className="mt-auto mb-6 text-center text-gray-800 text-sm">
            Logged in as <br />
            <span className="font-semibold">{user.name}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;