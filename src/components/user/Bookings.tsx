import React, { useState,useEffect } from 'react';
import userAxiosInstance from '../../../axios/userAxiosInstance';
import { jwtDecode } from 'jwt-decode';
import API_URL from '../../../axios/API_URL';


interface BookingDetail {
  name: string;
  _id: string;
  // userId:{
  //   name:string,
  //   email:string
  // }
  startDate:string
  startTime: string;
  endTime: string;
  sessionType: string;
  paymentStatus: string;
  sessionStatus?: string;
  userId:string
  bookingDate:string
  trainerName:string
}


function Bookings() {


    const[bookingDetails,setBookingDetails]=useState<BookingDetail[]>([])
      
      
     

    useEffect (()=>{

        const fetchbookingDetails=async()=>{
          try {
                           
            const response=await userAxiosInstance.get(`${API_URL}/api/user/booking-details`)
            console.log("response issss",response.data)
            setBookingDetails(response.data.data)
          } catch (error) {
            console.log("Error in fetching userDetails")
          }
        }
        fetchbookingDetails()
      },[])
      console.log("bookingDetails isss",bookingDetails)

  return (
    <div className="flex-1 p-8 bg-gradient-to-r from-[#f7f7f7] via-[#e6d5eb] to-[#f6edf7] overflow-y-auto min-h-screen">
      
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-6 mb-6">
        <h1 className="text-4xl font-bold text-[#572c52] text-center flex-1">My Bookings</h1>
        <div className="bg-white shadow-lg rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold text-[#572c52] mb-2">Total Sessions</h3>
          <p className="text-3xl font-bold text-[#572c52]">{bookingDetails.length}</p>
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8">
      
        
        <div className="grid grid-cols-7 gap-4 text-center text-[#572c52] text-lg font-semibold border-b border-gray-300 pb-3">
          <div>Trainer</div>
          <div>Booking Date</div>
          <div>Start Time</div>
          <div>End Time</div>
          <div>Session Type</div>
          <div>Payment Status</div>
          <div>Action</div>
        </div>
             {bookingDetails.length>0?(

bookingDetails.map((session) => (
             
      
        <div className="grid grid-cols-7 gap-4 items-center p-4 hover:bg-gradient-to-r from-[#e6d5eb] via-[#f3c6d3] to-[#f6edf7] transition-all border-b border-gray-300 rounded-lg">
          <div className="text-center text-[#333] font-medium">{session.trainerName} </div>
          <div className="text-center text-[#333] font-medium">{new Date(session.bookingDate).toLocaleDateString()}</div>
          <div className="text-center text-[#333] font-medium">{session.startTime}</div>
          <div className="text-center text-[#333] font-medium">{session.endTime}</div>
          <div className="text-center font-medium">
            <span className="bg-gradient-to-r from-[#9e7cc2] to-[#572c52] text-white rounded-full px-4 py-1 text-sm">{session.sessionType}</span>
          </div>
          <div className="text-center font-medium">
            <span className="inline-block bg-[#51ca87] text-white px-4 py-2 rounded-lg text-sm">{session.paymentStatus}</span>
          </div>
          <div className="text-center">
            <button className="bg-[#572c52] text-white px-4 py-2 rounded-lg hover:bg-[#41203e] transition">Cancel</button>
          </div>
        </div>
))
             ):(
        <p className="text-center text-gray-500 mt-6">No more upcoming sessions.</p>
             )}
      </div>
    </div>
  );
}

export default Bookings;
