import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Typography,Button,Paper, TextField,} from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Replace this with the actual API URL from your project
import API_URL from "../../../axios/API_URL";
import {loadStripe} from '@stripe/stripe-js';
import userAxiosInstance from "../../../axios/userAxiosInstance";
import { useNavigate } from "react-router-dom";


// Define TypeScript interfaces for the required types
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
        const response = await axios.get(`${API_URL}/api/user/trainers/${trainerId}`);
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
        const response = await axios.get(`${API_URL}/api/user/schedules`)
       
        const schedules = response.data
        console.log("------------",schedules)
        // Filt er and extract available dates
        const date = Array.from(
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


  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      const slots = sessionSchedules
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

  const handlepayment=async (sessionId: string)=>{
    
    try {
      const response=await userAxiosInstance.post(`/api/user/payment/${sessionId.id}`,{userData:userId})
      console.log("response for fetch is..........",response)
      const stripe=await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      console.log("stripe is------------",stripe)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="max-w-3xl mx-auto">
        <Paper elevation={6} className="shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#572c52] to-purple-500 opacity-70"></div>
            <img
              src={trainer?.profileImage}
              alt="Trainer"
              className="h-40 w-40 mx-auto mt-6 rounded-full border-4 border-white relative z-10"
            />
          </div>
          <div className="p-6 text-center">
            <Typography variant="h5">{trainer?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Specializations: {trainer?.specializations[0]?.name || "N/A"}
            </Typography>
            <Typography variant="body1" mt={4}>
              Dedicated and experienced professional Fitness Trainer
            </Typography>
            <div className="flex justify-center mt-6 space-x-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBookSession("single")}
              >
                Book Single Session
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBookSession("package")}
              >
                Book Package Session
              </Button>
            </div>
          </div>
        </Paper>
        {(isSingleSession || isPackageSession) && (
          <Paper elevation={6} className="mt-10 p-6 shadow-lg rounded-lg">
            <Typography variant="h6" color="green" align="center">
              Choose an Available Date
            </Typography>
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

            {selectedDate && availableSlots.length > 0 && (
              <div className="mt-6">
                <Typography variant="body1" style={{ fontWeight: 'bold', color: '#4caf50' }} mb={4}>
                  Proceed to payment:
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  {availableSlots.map((slot, index) => (

                    <Button
                      key={index}
                      variant="contained"
                      color="primary"
                      onClick={() => handlepayment(slot)}
                    >
                      SESSION TIME{slot.time}  RS {slot.price}/- Only

                    </Button>
                    
                  ))}
                </div>
              </div>
            )}
            {selectedDate && availableSlots.length === 0 && (
              <Typography variant="body2" align="center" mt={5}>
                No slots available for the selected date.
              </Typography>
            )}
          </Paper>
        )}
      </div>
    </div>
  );
}

export default TrainersProfileView;
