import { GrMoney } from "react-icons/gr";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    // <div className="flex flex-col p-6 space-y-8 min-h-screen">
    <div
      className="flex flex-col p-6 space-y-8 min-h-screen bg-gradient-to-r"
      style={{ background: "linear-gradient(to right, #fffff, #ffffff)" }}
    >
      <div className="flex flex-col justify-center items-center text-center text-[#1b0f19] mb-8">
        <h1 className="text-4xl font-extrabold">
          Welcome to Admin's Dashboard
        </h1>
        <p className="text-xl mt-2">Your overview and management hub</p>
        <div className="relative w-full h-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#70466c] to-[#1b0f19] text-white rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 transform hover:bg-green-700">
          <div className="flex items-center space-x-4">
            <GrMoney size={40} />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Total Revenue</h1>
              <h3 className="text-3xl font-bold mt-2"></h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#94668f] to-[#1b0f19] text-white rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 transform hover:bg-[#572c52]">
          <div className="flex items-center space-x-4">
            <FaUser size={40} />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Total Users</h1>
              <h3 className="text-3xl font-bold mt-2"></h3>
              <h1 className="text-lg font-semibold mt-4">Active Users</h1>
              <h3 className="text-2xl mt-1"></h3>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#94668f] to-[#1b0f19] text-white rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 transform hover:bg-yellow-700">
          <div className="flex items-center space-x-4">
            <FaUser size={40} />

            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Total Trainers</h1>
              <h3 className="text-3xl font-bold mt-2"></h3>
              <h1 className="text-lg font-semibold mt-4">Active Trainers</h1>
              <h3 className="text-2xl mt-1"></h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 max-w-7xl mx-auto"></div>
    </div>
  );
}

export default AdminDashboard;
