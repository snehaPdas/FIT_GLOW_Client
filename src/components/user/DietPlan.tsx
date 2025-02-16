import React, { useState, useEffect } from "react";
import userAxiosInstance from "../../../axios/userAxiosInstance";
import API_URL from "../../../axios/API_URL";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Trainer } from "../../types/trainer";
import dietimg from "../../assets/dietplans.jpg";

function DietPlan() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [dietPlan, setDietPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const userId=userInfo?.id
   console.log("use issssssssss",userId)
  

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await userAxiosInstance.get(`${API_URL}/api/user/booking-details`);
        console.log("Trainer Response:", response.data.data);

        const TrainerIdseen = new Set();
        const uniqueUsers = response.data.data.filter((booking: any) => {
          if (!booking.userId || !booking.trainerId._id) return false;
          if (TrainerIdseen.has(booking.trainerId._id)) return false;
          TrainerIdseen.add(booking.trainerId._id);
          return true;
        });

        setTrainers(uniqueUsers.map((booking: any) => ({
          trainerId: booking.trainerId,
          bookingId: booking._id,
          trainerName: booking.trainerId.name
        })));
      } catch (error: any) {
        console.error("Error fetching trainer:", error.response?.data || error.message);
      }
    };

    fetchTrainers();
  }, []);

  const fetchDietPlan = async (trainerId: string) => {
    setLoading(true);
    
    try {
      const response = await userAxiosInstance.get(`${API_URL}/api/user/dietplan/${trainerId}/${userId}`);
      console.log("Diet Plan Response:", response.data);
      setDietPlan(response.data);
    } catch (error: any) {
      console.error("Error fetching diet plan:", error.response?.data || error.message);
      setDietPlan(null);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-left justify-center p-6"
      style={{
        backgroundImage: `url(${dietimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Choose Trainer To see Your DietPlans</h2>

        {trainers.length === 0 ? (
          <p className="text-center">No trainers available.</p>
        ) : (
          <ul className="space-y-2">
            {trainers.map((trainer) => (
              <li
                key={trainer.trainerId._id}
                onClick={() => {
                  setSelectedTrainer(trainer.trainerId._id);
                  fetchDietPlan(trainer.trainerId._id);
                }}
                className="cursor-pointer p-2 bg-blue-100 hover:bg-blue-200 rounded text-center"
              >
                {trainer.trainerName}
              </li>
            ))}
          </ul>
        )}

        {
        loading && <p className="mt-4 text-blue-500 text-center">Loading diet plan...</p>}

{!loading && selectedTrainer && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-center">Diet Plan</h3>
            {dietPlan ? (
              <>
                <p><strong>Morning:</strong> {dietPlan.morning}</p>
                <p><strong>Lunch:</strong> {dietPlan.lunch}</p>
                <p><strong>Evening:</strong> {dietPlan.evening}</p>
                <p><strong>Night:</strong> {dietPlan.night}</p>
                <p><strong>Total Calories:</strong> {dietPlan.totalCalories}</p>
                <p className="text-sm text-gray-500 mt-2 text-center">Created on: {new Date(dietPlan.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <p className="text-center text-red-500">No diet plan available.</p>
            )}
          </div>
        )}

        
      </div>
    </div>
  );
}

export default DietPlan;
