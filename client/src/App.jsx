import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import PostJob from "./pages/postjob";
import ProtectedRoute from "./routes/ProtectedRoute";
import WorkerDashboard from "./pages/WorkerDashboard";
import UpdateWorker from "./pages/UpdateWorker";

function App() {
  return (
    <>
      <Navbar />

      <div className="ml-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
           
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="/worker/edit/:id" element={<UpdateWorker />} />
            
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;