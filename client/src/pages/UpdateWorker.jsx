import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import {
  FaUser,
  FaPhone,
  FaCity,
  FaMapMarkerAlt,
  FaTools,
  FaGlobe,
  FaFlag,
  FaBirthdayCake,
  FaImage
} from "react-icons/fa";

const UpdateWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [form, setForm] = useState({
    gender: "",
    dob: "",
    phone: "",
    location: "",
    skills: "",
    country: "",
    state: "",
    city: "",
    image: ""
  });

  // Fetch worker data
  const findData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/worker/getid/${id}`, {
        withCredentials: true
      });
      if (data.success) {
        setWorker(data.find);
        setForm({
          gender: data.find.gender,
          dob: data.find.dob,
          phone: data.find.phone,
          location: data.find.location,
          skills: data.find.skills,
          country: data.find.country,
          state: data.find.state,
          city: data.find.city,
          image: data.find.image
        });
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to fetch worker data");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") setForm({ ...form, country: value, state: "", city: "" });
    else if (name === "state") setForm({ ...form, state: value, city: "" });
    else setForm({ ...form, [name]: value });
  };

  // Update worker
  const updateWorker = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/worker/update/${id}`,
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/worker-dashboard");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Failed to update worker");
    }
  };

  useEffect(() => {
    findData();
  }, []);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.country);
  const cities = City.getCitiesOfState(form.country, form.state);

  if (!worker) return <p className="text-center mt-10 text-gray-500">Loading worker data...</p>;

  // Input fields configuration with icons
  const inputFields = [
    { name: "gender", label: "Gender", icon: <FaUser className="text-orange-500" />, type: "select", options: ["Male","Female","Other"] },
    { name: "dob", label: "Date of Birth", icon: <FaBirthdayCake className="text-pink-500" />, type: "date" },
    { name: "phone", label: "Phone", icon: <FaPhone className="text-green-500" />, type: "text", placeholder: "Enter phone" },
    { name: "image", label: "Image URL", icon: <FaImage className="text-violet-500" />, type: "text", placeholder: "Image URL" },
    { name: "skills", label: "Skills", icon: <FaTools className="text-blue-500" />, type: "text", placeholder: "Plumber, Electrician..." },
    { name: "location", label: "Address", icon: <FaMapMarkerAlt className="text-red-500" />, type: "text", full: true, placeholder: "Enter your address" },
    { name: "country", label: "Country", icon: <FaGlobe className="text-teal-500" />, type: "select", options: countries.map(c => ({ value: c.isoCode, label: `${c.name} ${c.flag || ""}` })) },
    { name: "state", label: "State", icon: <FaFlag className="text-yellow-500" />, type: "select", options: states.map(s => ({ value: s.isoCode, label: s.name })), disabled: !form.country },
    { name: "city", label: "City", icon: <FaCity className="text-purple-500" />, type: "select", options: cities.map(c => ({ value: c.name, label: c.name })), disabled: !form.state, full: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex justify-center items-start p-10">
      <form className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-orange-500">Update Worker</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {inputFields.map((field, idx) => (
            <div key={idx} className={`${field.full ? "md:col-span-2" : ""} relative`}>
              <label className="block mb-2 font-semibold text-gray-700">{field.label}</label>
              <div className="relative">
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    disabled={field.disabled}
                    className="w-full border p-3 rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(opt => (
                      <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    className="w-full border p-3 rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 transition"
                  />
                )}
                <div className="absolute top-3 left-3">{field.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={updateWorker}
          className="mt-10 w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Update Worker
        </button>
      </form>
    </div>
  );
};

export default UpdateWorker;