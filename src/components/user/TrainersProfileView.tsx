import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Typography,Button,Paper, TextField,} from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



import API_URL from "../../../axios/API_URL";
import {loadStripe} from '@stripe/stripe-js';
import userAxiosInstance from "../../../axios/userAxiosInstance";
import { useNavigate } from "react-router-dom";

interface ISessionSchedule {
  _id: any;
  price: any;
  selectedDate?: string;
  startDate: string;
  startTime: string;
  endTime: string;
  type: string;
  trainerId: string;
  isBooked: boolean;

}

interface TrainerProfile {
  _id: string;
  name: string;
  profileImage: string;
 specializations: { name: string }[];
}

function TrainersProfileView() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSingleSession, setIsSingleSession] = useState(false);
  const [isPackageSession, setIsPackageSession] = useState(false);
  const [sessionSchedules, setSessionSchedules] = useState<ISessionSchedule[]>([]);
  const [trainer, setTrainer] = useState<TrainerProfile | null>(null);

  const { trainerId } = useParams<{ trainerId: string }>();

  
  const userInfo:any=localStorage.getItem("accesstoken")
  
  const parseinfo=JSON.parse(atob(userInfo.split(".")[1]))
  const userId=parseinfo.id
  const navigate=useNavigate()

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await userAxiosInstance.get(`${API_URL}/api/user/trainers/${trainerId}`);
        if (response.data && response.data.length > 0) {
          setTrainer(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching trainer:", error);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  useEffect(() => {
    const fetchSessionSchedules = async () => {
      try {
        const response = await userAxiosInstance.get(`${API_URL}/api/user/schedules`)
       
        const schedules = response.data
        // Filt er and extract available dates
        const date:any = Array.from(
          new Set(
            schedules
              .filter(
                (schedule: { isBooked: any; trainerId: string | undefined; type: string; }) =>
                  !schedule.isBooked &&
                  schedule.trainerId === trainerId &&
                  ((isSingleSession && schedule.type === "single") ||
                    (isPackageSession && schedule.type === "package"))
              )
              .map((schedule: { selectedDate: any; startDate: any; }) =>
                dayjs(schedule.selectedDate || schedule.startDate).format("YYYY-MM-DD")
              )
          )
        );

        setSessionSchedules(schedules);
        setAvailableSlots(date);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSessionSchedules();
  }, []);


  const handleDateChange = (date: any | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      const slots:any = sessionSchedules
        .filter((schedule) => {
          const scheduleDate = dayjs(schedule.selectedDate || schedule.startDate).format(
            "YYYY-MM-DD"
          );
          return (
            scheduleDate === formattedDate &&
            schedule.trainerId.toString() === trainer?._id.toString() &&
            !schedule.isBooked &&
            ((isSingleSession && schedule.type === "single") ||
              (isPackageSession && schedule.type === "package"))
          );
        })
        .map((schedule) => ({
          time: `${schedule.startTime} - ${schedule.endTime}`,
          price: schedule.price,
          id:schedule._id
        }));
        
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleBookSession = (sessionType: string) => {
    setIsSingleSession(sessionType === "single");

    setIsPackageSession(sessionType === "package");
    setSelectedDate(dayjs());
    setAvailableSlots([]);
  };

  const handleConfirmBooking = (slot: string, id: any) => {
    if (selectedDate) {
      alert(`Session booked for ${slot} on ${selectedDate.toDate().toLocaleDateString()}`);
    }
    setSelectedDate(dayjs());
    setAvailableSlots([]);
    setIsSingleSession(false);
    setIsPackageSession(false);
  };

  const availableDates = Array.from(
    new Set(
      sessionSchedules
        .filter(
          (schedule) =>
            !schedule.isBooked &&
            ((isSingleSession && schedule.type === "single") ||
              (isPackageSession && schedule.type === "package"))
        )
        .map((schedule) =>
          dayjs(schedule.selectedDate || schedule.startDate).format("YYYY-MM-DD")
        )
    )
  );

  const handlepayment=async (sessionId: any)=>{
    
    try {
      const response=await userAxiosInstance.post(`/api/user/payment/${sessionId.id}`,{userData:userId})
      console.log("response for fetch is..........",response)
      const stripe=await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      if(stripe){
        await stripe.redirectToCheckout({sessionId:response.data.id})
      }else{
        navigate("/login")
      }
    } catch (error) {
      console.log("error in payment",error)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
  <div className="max-w-3xl mx-auto">
    {/* Trainer Card */}
    <div className="shadow-xl rounded-lg overflow-hidden bg-white">
      <div className="relative">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#572c52] to-purple-500 opacity-70"></div>
        {/* Profile Image */}
        <img
          src={trainer?.profileImage}
          alt="Trainer"
          className="h-40 w-40 mx-auto mt-6 rounded-full border-4 border-white relative z-10"
        />
      </div>
      {/* Trainer Details */}
      <div className="p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{trainer?.name}</h2>
        <p className="text-gray-500 mt-2">
          Specializations: {trainer?.specializations[0]?.name || "N/A"}
        </p>
        <p className="text-gray-700 mt-4">
          Dedicated and experienced professional Fitness Trainer.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => handleBookSession("single")}
            className="px-6 py-2 bg-[#977493] text-white font-semibold rounded-lg shadow hover:bg-[#7b4373] transition transform hover:scale-105"
          >
            Book Single Session
          </button>
          <button
            onClick={() => handleBookSession("package")}
            className="px-6 py-2 bg-[#9d7b99] text-white font-semibold rounded-lg shadow hover:bg-[#7b4373] transition transform hover:scale-105"
          >
            Book Package Session
          </button>
        </div>
      </div>
    </div>

    {/* Session Selection */}
    {(isSingleSession || isPackageSession) && (
      <div className="shadow-xl rounded-lg mt-12 p-8 bg-white">
        <h3 className="text-xl font-semibold text-[#0c0c0c] text-center">
          Choose an Available Date
        </h3>
        <div className="mt-6 flex justify-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              shouldDisableDate={(date) => {
                const formattedDate = date.format("YYYY-MM-DD");
                return !availableDates.includes(formattedDate);
              }}
              slots={{
                textField: TextField,
              }}
              slotProps={{
                textField: { fullWidth: false, variant: "outlined" },
              }}
            />
          </LocalizationProvider>
        </div>

        {/* Slots */}
        {selectedDate && availableSlots.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              Proceed to payment:
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handlepayment(slot)}
                  className="px-4 py-3 bg-[#683f64] text-white font-semibold rounded-lg shadow hover:bg-[#7b4373] transition transform hover:scale-105"
                >
                  {`Session Time: ${slot.time}`} <br />
                  {`Rs. ${slot.price}/- Only`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Slots Available */}
        {selectedDate && availableSlots.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No slots available for the selected date.
          </p>
        )}
      </div>
    )}
  </div>
</div>

  );
}

export default TrainersProfileView;
