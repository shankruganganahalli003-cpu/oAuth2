import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="https://oauth2-p9p9.onrender.com/api/login" replace />;

  return <Outlet />; // <-- important
};

export default ProtectedRoute;