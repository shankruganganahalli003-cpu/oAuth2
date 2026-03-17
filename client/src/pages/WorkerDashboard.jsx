import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    UserIcon, CalendarIcon, PhoneIcon, MapPinIcon,
    BuildingLibraryIcon, FlagIcon, AcademicCapIcon, IdentificationIcon, PencilSquareIcon, TrashIcon
} from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

const WorkerDashboard = () => {
    const navigate = useNavigate();
    
    const [workers, setWorkers] = useState([]);

    const fetchWorkers = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/worker/getme", {
                withCredentials: true
            });
            if (data.success) setWorkers(data.get);
        } catch (err) {
            console.log(err.message);
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    };

    const handledelete = async(id)=>{
        try {
            if (!window.confirm("Delete this profile?")) return;
            const {data} = await axios.delete(`http://localhost:3000/api/worker/delete/${id}`,{
                withCredentials:true
            });

            if(data.success){
                console.log(data);
                toast.success(data.message);
                fetchWorkers();
                navigate("/post-job");
            }

            
        } catch (err) {
            toast.error(err?.response?.data?.message);
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchWorkers();
    }, []);

    return (
        <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Worker Dashboard</h1>

            {workers.length === 0 ? (
                <p className="text-center text-gray-500">No workers found.</p>
            ) : (
                <div className="space-y-8">
                    {workers.map(worker => (
                        <div
                            key={worker._id}
                            className="bg-white rounded-xl shadow-lg  flex-col md:flex-row items-center md:items-start p-6 md:p-8 transform transition-all duration-500 hover:scale-101 hover:shadow-2xl"
                        >
                            {/* Left: Circular Image */}
                            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">

                                <div className='flex justify-between items-center'>
                                    <img
                                        src={worker.image}
                                        alt="worker"
                                        className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 shadow-md"
                                    />
                                    <div className='flex gap-10'>
                                        {/* Edit Icon */}
                                        <PencilSquareIcon onClick={() => { navigate(`/worker/edit/${worker._id}`) }} className="w-10 h-20 hover:scale-110 transition duration-200 text-blue-600 hover:text-blue-900 cursor-pointer" />

                                        {/* Delete Icon */}
                                        <TrashIcon onClick={()=>{handledelete(worker._id)}} className="w-10 h-20 text-red-600 hover:text-red-900 hover:scale-110 transition duration-200 cursor-pointer" />
                                    </div>
                                </div>

                            </div>

                            {/* Right: Worker Info */}
                            <div className="flex-1 space-y-3 text-gray-700 w-full mt-3">
                                <p className="flex items-center gap-2 text-blue-600 font-medium">
                                    <UserIcon className="w-5 h-5" /> Gender: {worker.gender}
                                </p>
                                <p className="flex items-center gap-2 text-purple-600 font-medium">
                                    <CalendarIcon className="w-5 h-5" /> DOB: {worker.dob}
                                </p>
                                <p className="flex items-center gap-2 text-green-600 font-medium">
                                    <PhoneIcon className="w-5 h-5" /> Phone: {worker.phone}
                                </p>
                                <p className="flex items-center gap-2 text-orange-600 font-medium">
                                    <MapPinIcon className="w-5 h-5" /> Location: {worker.location}
                                </p>
                                <p className="flex items-center gap-2 text-teal-600 font-medium">
                                    <BuildingLibraryIcon className="w-5 h-5" /> City: {worker.city}
                                </p>
                                <p className="flex items-center gap-2 text-pink-600 font-medium">
                                    <MapPinIcon className="w-5 h-5" /> State: {worker.state}
                                </p>
                                <p className="flex items-center gap-2 text-red-600 font-medium">
                                    <FlagIcon className="w-5 h-5" /> Country: {worker.country}
                                </p>
                                <p className="flex items-center gap-2 text-blue-500 font-medium">
                                    <AcademicCapIcon className="w-5 h-5" /> Skills:
                                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse ml-2">
                                        {worker.skills}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 font-medium">
                                    <IdentificationIcon className="w-5 h-5" /> User ID: {worker.userId}
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 font-medium">
                                    <IdentificationIcon className="w-5 h-5" /> Worker ID: {worker._id}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkerDashboard;