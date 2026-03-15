import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;
    
    try {
      const res = await axios.post("http://localhost:3000/api/auth/google-login", {
        token: credentialResponse.credential
      });

      dispatch(setCredentials({
        token: res.data.token,
        user: res.data.user
      }));

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Login with Google</h1>
      <GoogleLogin 
        onSuccess={handleSuccess} 
        onError={() => console.log("Login Failed")} 
      />
    </div>
  );
}

export default Login;