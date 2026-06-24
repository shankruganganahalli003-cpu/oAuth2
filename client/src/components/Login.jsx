import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const roleStyles = {
  user: {
    selected: "bg-blue-500 text-white shadow-lg scale-105",
    normal: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  },
  worker: {
    selected: "bg-green-500 text-white shadow-lg scale-105",
    normal: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  },
};

const RoleButton = ({ roleName, selectedRole, setRole }) => {
  const isSelected = selectedRole === roleName;

  return (
    <button
      onClick={() => setRole(roleName)}
      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
        isSelected
          ? roleStyles[roleName].selected
          : roleStyles[roleName].normal
      }`}
    >
      {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
    </button>
  );
};

const Login = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      // 1. ROLE CHECK
      if (!role) {
        toast.error("Please select your role first!");
        return;
      }

      // 2. TOKEN CHECK
      const token = credentialResponse?.credential;

      if (!token) {
        toast.error("Google login failed (no token received)");
        return;
      }

      setLoading(true);

      // 3. SEND TO BACKEND
      const { data } = await axios.post(
        "https://oauth2-p9p9.onrender.com/api/auth/google-login",
        {
          token,
          role,
        },
        {
          withCredentials: true,
        }
      );

      // 4. SAVE STATE
      dispatch(
        setCredentials({
          user: data.user,
          token: data.jwtToken,
        })
      );

      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome ${data.user.name}`);

      // 5. REDIRECT
      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      toast.error(
        err.response?.data?.error || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-green-100 px-4">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          <span className="text-orange-500">दक्ष</span>{" "}
          <span className="text-green-600">भारत</span>
        </h1>

        <p className="text-gray-500 mb-6 font-medium">
          Select Your Role
        </p>

        {/* ROLE BUTTONS */}
        <div className="flex justify-center gap-4 mb-6">
          <RoleButton roleName="user" selectedRole={role} setRole={setRole} />
          <RoleButton roleName="worker" selectedRole={role} setRole={setRole} />
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-sm text-gray-500">
            Logging you in...
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;