import React, { useEffect, useState } from 'react';
import userAxiosInstance from '../../../axios/userAxiosInstance';
import API_URL from '../../../axios/API_URL';
import {Trainer} from "../../types/trainer"
import {useNavigate}  from 'react-router-dom';




function TrainersList() {
    const[trainers,setTrainers]=useState<Trainer[]>([])
    const navigate=useNavigate()

    useEffect(()=>{
        console.log("yes in useeffect")
        async function fetchAllUsers(){
            try {
                const response=await userAxiosInstance.get(`${API_URL}/api/user/trainers`)
                const trainersData=response.data
                setTrainers(trainersData)
                console.log(trainers)
            } catch (error) {
                console.log("error in fetching trainers",error)
            }
        }
        fetchAllUsers()
    },[])
    const handleViewProfile = (trainerId: string) => {
      navigate(`/trainersprofileview/${trainerId}`);
    };
    
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#572c52]">
        Meet Our Trainers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={trainer.profileImage}
              alt={trainer.name}
              className="w-full h-70 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {trainer.name}
              </h2>
              <p className="text-gray-600 mt-2">{trainer.specializations?.map((spec) => spec.name).join(', ')}</p>
              <button onClick={()=>handleViewProfile(trainer._id)} className="mt-4 px-4 py-2 bg-[#572c52] text-white font-medium rounded-full hover:bg-[#7b4373] transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainersList;


