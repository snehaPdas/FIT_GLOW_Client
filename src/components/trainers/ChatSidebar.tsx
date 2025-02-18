import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import trainerAxiosInstance from '../../../axios/trainerAxiosInstance';
import userimg from "../../assets/profieicon.png";
import TrainerChat from './TrainerChat';
import { setDietPLan } from '../../features/trainer/TrainerSlice';

interface User {
  userId: {
    _id: string;
    name: string;
    
  };
  bookingId: string;
}

function ChatSidebar() {
  const trainerinfo = useSelector((state: RootState) => state.trainer);
  const showDietPlan = useSelector((state: RootState) => state.trainer.showDietPlan);
  

  const trainerId = trainerinfo?.trainerInfo?.id;
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [dietInfo, setDietInfo] = useState<string | null>(null);

   const dispatch=useDispatch()
  useEffect(() => {
    if (!trainerId) return;

    const fetchUsers = async () => {
      try {
        const response = await trainerAxiosInstance.get(`/api/trainer/bookingdetails/${trainerId}`);
        

        const seenUserId = new Set();
        const uniqueUsers = response.data.data.filter((booking: any) => {
          if (!booking.userId || !booking.userId._id) return false; // Ensure userId exists
          if (seenUserId.has(booking.userId._id)) return false;
          seenUserId.add(booking.userId._id);
          return true;
        });

        setUsers(uniqueUsers.map((booking: any) => ({
          userId: {
            _id: booking.userId._id,
            name: booking.userId.name || "Unknown",
            userImage: booking.userId.userImage || "default-avatar.png",
          },
          bookingId: booking._id,
        })));
      } catch (error: any) {
        console.error("Error fetching trainer:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, [trainerId]);

  const handleUserSelect = (userId: string, booking: string) => {
    setSelectedUserId(userId);
    setBookingId(booking);
  };

  if (!trainerId) return null;

  const handleDietPlanClose = () => {
    dispatch(setDietPLan(false));
  };

  console.log("users",users)
  console.log("setSelectedUserId",selectedUserId)

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white shadow-lg border-r border-gray-700">
    {/* Sidebar */}
    <div className="w-full sm:w-80 bg-gray-900 text-white shadow-lg border-b sm:border-b-0 sm:border-r border-gray-700 flex flex-col">
      <div className="bg-gradient-to-r from-purple-500 to-[#572c52] px-5 py-4 flex items-center shadow-md">
        <h1 className="text-lg font-semibold">Chats</h1>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full bg-gray-800 text-white placeholder-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572c52]"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.userId._id}
              onClick={() => handleUserSelect(user.userId._id, user.bookingId)}
              className={`flex items-center justify-between mb-2 border-b border-gray-200 pb-2 cursor-pointer rounded-md ${
                selectedUserId === user.userId._id ? "bg-[#572c52] text-white" : "bg-blue-100 text-gray-800"
              } transition-all`}
            >
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={userimg} alt="User" />
                <div className="ml-4">
                  <h3 className="font-semibold">{user.userId.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 py-8">
            <p>No trainers found to chat with.</p>
          </div>
        )}
      </div>
    </div>

    {/* Chat Window */}
    <div className="flex-1 h-[400px] sm:h-auto overflow-auto shadow-lg">
      {selectedUserId ? (
        <TrainerChat 
          userId={selectedUserId} 
          bookingId={users.find(user => user.userId._id === selectedUserId)?.bookingId || ''} 
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-xl">Select a user to start chatting
          </p>
        </div>
      )}
    </div>
{/* //////////////////////////////////////////////////////////////////////////////////////////// */}
{
showDietPlan && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-[800px] shadow-lg">
    <h1 className="font-bold text-xl text-center text-blue-500 mb-6">Send Diet Plan</h1>

      {users.length > 0 ? (
        users
          .filter((user) => user.userId._id === selectedUserId)
          .map((user, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
              

                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <img
                    src={userimg}
                    alt="User profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className= "text-blue-500 mb-6">
                  <p><strong>Name:</strong> {user.userId.name || "N/A"}</p>
                  {/* <p><strong>Email:</strong> {user.email || "N/A"}</p> */}
                  {/* <p><strong>Specialization:</strong> {user.specialization || "N/A"}</p> */}
                </div>
              </div>

              {/* Diet Plan Form */}
              <div className="mt-4 space-y-4">
                {["Breakfast", "Lunch", "Snacks", "Dinner", "Total Calories"].map((meal, i) => (
                  <div key={i}>
                    <label htmlFor={`${meal}-${index}`} className="block font-medium text-gray-700 mb-1">
                      {meal}
                    </label>
                    <input
                      type={meal === "Total Calories" ? "number" : "text"}
                      id={`${meal}-${index}`}
                      placeholder={`Enter ${meal.toLowerCase()} details...`}
                      // onChange={(e) => setDietPlanInfo(prev => ({ ...prev, [meal.toLowerCase().replace(' ', '')]: e.target.value }))}
                      className="w-full border rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <p>No user selected.</p>
      )}

      <div className="flex justify-end gap-5 mt-4">
        <button
          onClick={handleDietPlanClose}
          className="px-5 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
        >
          Cancel
        </button>
        {/* <button
          onClick={handleDietPlanSend}
          className="px-5 py-2 bg-green-500 hover:bg-green-700 rounded-md shadow-md text-white"
        >
          Send
        </button> */}
      </div>
    </div>
  </div>
)
}

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


  </div>
  );
}

export default ChatSidebar;
function dispatch(arg0: { payload: boolean; type: "trainer/setDietPLan"; }) {
  throw new Error('Function not implemented.');
}

