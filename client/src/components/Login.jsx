import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      toast.error("Google login failed");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/google-login",
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
dispatch(setCredentials({ user: res.data.user, token: res.data.token }));


localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(`Welcome ${res.data.user.name}`);
      console.log(res);
      navigate("/");
    } catch (err) {
      toast.error("Login failed");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold mb-6">Login with Google</h2>
      <GoogleLogin onSuccess={handleLogin} onError={() => toast.error("Login failed")} />
    </div>
  );
};

export default Login;