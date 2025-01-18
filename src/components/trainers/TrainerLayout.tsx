import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import TrainerSideBar from "./TrainerSideBar";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import img from "../../assets/cartoon1234567.webp";

const TrainerLayout: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationOpen(false); // Close notifications when profile opens
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileDropdownOpen(false); // Close profile when notifications open
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node) &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsProfileDropdownOpen(false);
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    


    <div className="h-screen flex bg-slate-100">
      {/* Sidebar */}
      <TrainerSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Quote Section (Status Bar) */}
        <section className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] py-2 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <FaQuoteLeft className="text-3xl text-[#572c52]" />
            <p className="text-lg font-semibold   text-[#572C57]">
              Train in confidence, believe in yourself.
    
            </p>
            <FaQuoteRight className="text-3xl  text-[#572c52]" />
            <div className="w-41 h-20 overflow-hidden opacity-">
  <img
    src={img}
    alt="Cartoon illustration"
    className=" h-auto"
  />
</div>

          </div>
          <div className="flex items-center space-x-4">
            <div>
            
            
            </div>
           
           <div className="relative" ref={notificationRef}>
              <BsBell
                className="h-5 w-5 cursor-pointer text-[#572c52]"
                onClick={toggleNotificationDropdown}
              />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-[#572c52] bg-red-600 rounded-full">
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

            <div className="relative" ref={profileRef}>
              <FaUserCircle 
                className="text-xl cursor-pointer text-[#572c52]"
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
