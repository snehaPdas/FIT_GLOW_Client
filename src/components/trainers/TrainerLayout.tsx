import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import TrainerSideBar from "./TrainerSideBar";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import img from "../../assets/cartoon dashboard.png"


const TrainerLayout: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <TrainerSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-[#572c52] to-[#572c52] text-white shadow-md py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Trainer Dashboard</h1>

          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative">
              <BsBell
                className="h-6 w-6 cursor-pointer"
                onClick={toggleNotificationDropdown}
              />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
                3
              </span>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg z-10">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      Notifications
                    </h3>
                    <ul className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                      <li className="text-sm">Notification 1</li>
                      <li className="text-sm">Notification 2</li>
                      <li className="text-sm">Notification 3</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <FaUserCircle
                className="text-2xl cursor-pointer"
                onClick={toggleProfileDropdown}
              />
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-10">
                  <ul className="py-1">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/trainer/profile")}
                    >
                      My Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/trainer/login")}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        <section className="flex justify-center items-center bg-gradient-to-r from-[#70466c] via-white to-[#70466c]">
  <div className="w-full max-w-4xl flex items-center space-x-4 bg-white p-4 rounded-lg shadow-xl">
    {/* Quote Section */}
    <div className="flex-1 text-center space-y-2">
      <div className="text-2xl font-semibold text-gray-800">
        <FaQuoteLeft className="inline text-3xl text-gray-500" />
        <p className="inline-block font-semibold text-sm">
          "Train in confidence, believe in yourself."
        </p>
        <FaQuoteRight className="inline text-3xl text-gray-500" />
      </div>

      <p className="text-sm text-gray-600">
        Consistency is key. Stay focused, stay strong, and let your actions speak louder than words!
      </p>
    </div>

    {/* Cartoon Image Section */}
    <div className="">
      <img
        src={img} // Smaller image size
        alt="Cartoon illustration"
        className="w-40 h-20 rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>




        {/* Content Area */}
        <div className="flex-1 p-6 bg-slate-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TrainerLayout;
