import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import trainerAxiosInstance from "../../../axios/trainerAxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Specialization {
  name: string;
  _id: string;
}

interface BookingDetail {
  name: string;
  _id: string;
  startDate: string;
  startTime: string;
  sessionEndTime: string;
  specialization: Specialization;
  sessionType: string;
  paymentStatus: string;
  sessionStatus?: string;
  userId: string;
}

function TrainerDashboard() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
  const navigate = useNavigate();
  const { trainerInfo } = useSelector((state: RootState) => state.trainer);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await trainerAxiosInstance.get(`/api/trainer/bookingdetails/${trainerInfo.id}`);
      
        setBookingDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching booking details", error);
      }
    };
    if (trainerInfo.id) {
      fetchBookingDetails();
    }
  }, [trainerInfo.id]);

  return (
    <div className="flex-1 p-4 md:p-6 bg-gradient-to-r from-[#f4f4f4] via-[#e3d9e7] to-[#f3f1f5] overflow-y-auto">
      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#572c52] mb-4">Booked Sessions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 text-center text-[#572c52] text-sm md:text-lg font-semibold border-b border-gray-300 pb-2">
          <div>Date</div>
          <div>Time</div>
          <div>Session Type</div>
          <div>Payment Status</div>
        </div>

        {bookingDetails.length > 0 ? (
          bookingDetails.map((session) => (
            <div key={session._id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 items-center p-2 md:p-4 hover:bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] transition-all border-b border-gray-300 rounded-lg">
              <div className="text-center text-[#333333] font-medium">{new Date(session.startDate).toLocaleDateString("en-US")}</div>
              <div className="text-center text-[#333333] font-medium">{session.startTime}</div>
              <div className="text-center text-[#333333] font-medium">
                <span className="bg-gradient-to-r from-[#9e7cc2] to-[#572c52] text-white rounded-full px-2 md:px-4 py-1 text-xs md:text-sm">{session.sessionType}</span>
              </div>
              <div className="text-center font-medium text-[#c8a900]">
                <span className="inline-block bg-[#51ca87] text-white px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm">{session.paymentStatus}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 md:mt-6">No upcoming sessions.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-[#572c52] mb-2 md:mb-4">Sessions Completed</h3>
          <p className="text-2xl md:text-3xl font-bold text-[#572c52]">0</p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-[#572c52] mb-2 md:mb-4">Total Sessions</h3>
          <p className="text-2xl md:text-3xl font-bold text-[#572c52]">{bookingDetails.length}</p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-[#572c52] mb-2 md:mb-4">Recent Messages</h3>
        <div className="space-y-2 md:space-y-4">
          <div className="p-2 md:p-4 bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] rounded-lg">
            <p className="text-[#666666]">No Recent Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;