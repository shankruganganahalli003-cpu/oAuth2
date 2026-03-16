import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gender: "",
    dob: "",
    phone: "",
    location: "",
    skills: "",
    country: "",
    image:"",
    state: "",
    city: "",
  });

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.country);
  const cities = City.getCitiesOfState(form.country, form.state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") setForm({ ...form, country: value, state: "", city: "" });
    else if (name === "state") setForm({ ...form, state: value, city: "" });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/worker/create",
        form,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (data.success) {
        toast.success("Worker registered successfully!");
        navigate("/worker-dashboard");
      } else toast.error(data.message || "Something went wrong");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Input fields with icons and colors
  const inputFields = [
    { name: "gender", label: "Gender", icon: <FaUser className="text-orange-500" />, type: "select", options: ["Male", "Female", "Other"] },
    { name: "dob", label: "Date of Birth", icon: <FaBirthdayCake className="text-pink-500" />, type: "date" },
    { name: "phone", label: "Phone", icon: <FaPhone className="text-green-500" />, type: "text", placeholder: "Enter your phone" },
    { name: "image", label: "Image", icon: <FaImage className="text-violet-600-500" />, type: "text", placeholder: "upload image" },
    { name: "skills", label: "Skills", icon: <FaTools className="text-blue-500" />, type: "text", placeholder: "Plumber, Electrician..." },
    { name: "location", label: "Address", icon: <FaMapMarkerAlt className="text-red-500" />, type: "text", full: true, placeholder: "Enter your address" },
    {
      name: "country",
      label: "Country",
      icon: <FaGlobe className="text-teal-500" />,
      type: "select",
      options: countries.map(c => ({ value: c.isoCode, label: `${c.name} 🇺🇸`.replace("🇺🇸", c.flag || "") }))
    },
    { name: "state", label: "State", icon: <FaFlag className="text-yellow-500" />, type: "select", options: states.map(s => ({ value: s.isoCode, label: s.name })), disabled: !form.country },
    { name: "city", label: "City", icon: <FaCity className="text-purple-500" />, type: "select", options: cities.map(c => ({ value: c.name, label: c.name })), disabled: !form.state, full: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 flex justify-center items-start p-10">
      <form className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl animate-fade-in" onSubmit={handleSubmit}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-orange-500">Worker Registration</h2>

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

        <button className="mt-10 w-full bg-linear-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostJob;