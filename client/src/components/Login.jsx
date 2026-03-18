import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RoleButton = ({ roleName, selectedRole, setRole, color }) => (
  <button
    onClick={() => setRole(roleName)}
    aria-label={`Select ${roleName} role`}
    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
      selectedRole === roleName
        ? `bg-${color}-500 text-white shadow-lg scale-105`
        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
    }`}
  >
    {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
  </button>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // no default role
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentialResponse) => {
    if (!role) {
      toast.error("Please select your role first!");
      return;
    }

    if (!credentialResponse?.credential) {
      toast.error("Google login failed. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/google-login",
        { token: credentialResponse.credential, role },
        { withCredentials: true }
      );

      dispatch(setCredentials({ user: data.user, token: data.jwtToken }));
      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome back, ${data.user.name}!`);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      console.error("Login error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-green-100 px-4 animate-gradient">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center hover:scale-105 transition-transform duration-500">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          <span className="text-orange-500">दक्ष</span>{" "}
          <span className="text-green-600">भारत</span>
        </h1>
        <p className="text-gray-500 mb-6 font-medium">Select Your Role</p>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-6">
          <RoleButton roleName="user" selectedRole={role} setRole={setRole} color="blue" />
          <RoleButton roleName="worker" selectedRole={role} setRole={setRole} color="green" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => toast.error("Google login failed")}
            text={loading ? "Loading..." : "Sign in with Google"}
            disabled={!role} // disable until role is selected
          />
        </div>

        {/* Footer */}
        <p className="mt-6 text-gray-500 text-sm">
          By signing in, you agree to our{" "}
          <span className="text-blue-500 underline cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;