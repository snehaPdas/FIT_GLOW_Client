import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerBody: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 bg-gradient-to-r from-[#f4f4f4] via-[#e3d9e7] to-[#f3f1f5] overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-6 mb-6">
        <div className="flex items-center space-x-6">
          {/* No profile or notification dropdown here */}
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#572c52] mb-4">Upcoming Sessions</h2>
        <div className="grid grid-cols-6 gap-4 text-center text-[#572c52] text-lg font-semibold border-b border-gray-300 pb-2">
          <div>User Name</div>
          <div>Date</div>
          <div>Time</div>
          <div>Session Type</div>
          <div>Specialization</div>
          <div>Status</div>
        </div>

        {/* Sample Session Data */}
        <div className="grid grid-cols-6 gap-4 items-center p-4 hover:bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] transition-all border-b border-gray-300 rounded-lg">
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium">
            <span className="bg-gradient-to-r from-[#9e7cc2] to-[#572c52] text-white rounded-full px-4 py-1 text-sm"></span>
          </div>
          <div className="text-center text-[#333333] font-medium">  </div> 
          <div className="text-center font-medium text-[#c8a900]">
            <span className="inline-block bg-[#51ca87] text-white px-4 py-2 rounded-lg text-sm"></span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 items-center p-4 hover:bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] transition-all border-b border-gray-300 rounded-lg">
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center text-[#333333] font-medium">
            <span className="bg-gradient-to-r from-[#9e7cc2] to-[#572c52] text-white rounded-full px-4 py-1 text-sm"></span>
          </div>
          <div className="text-center text-[#333333] font-medium"></div>
          <div className="text-center font-medium text-[#53db8c]">
            <span className="inline-block bg-[#51ca87] text-white px-4 py-2 rounded-lg text-sm"></span>
          </div>
        </div>
      </div>

      {/* Performance Stats Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#572c52] mb-4">Sessions Completed</h3>
          <p className="text-3xl font-bold text-[#572c52]"></p>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#572c52] mb-4">Total Trainees</h3>
          <p className="text-3xl font-bold text-[#572c52]"></p>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-[#572c52] mb-4">Recent Messages</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] rounded-lg">
            <p className="text-lg font-semibold text-[#333333]"></p>
            <p className="text-[#666666]">""</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-[#e3d9e7] via-[#f3c6d3] to-[#f3f1f5] rounded-lg">
            <p className="text-lg font-semibold text-[#333333]"></p>
            <p className="text-[#666666]">""</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerBody;
