import React, { useState, ChangeEvent, FormEvent ,useEffect} from "react";
import axiosinstance from "../../../axios/trainerAxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ISpecialization } from "../../types/trainer";
import API_URL from "../../../axios/API_URL";
import { ISessionSchedule } from "../../types/trainer";
import toast, { Toaster } from "react-hot-toast";


interface Session {
  selectedDate?: string;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  specialization: string;
  status: string; // "Confirmed" or "Pending"
  type?: string;
  price?: number; // Added price field
}

const ScheduleSessions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [sessionType, setSessionType] = useState<string>("Single");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [formData, setFormData] = useState({
    selectedDate: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    specialization: "",
    price: 0, // Initialize price to 0
  });
  const [spec, setSpec] = useState<ISpecialization[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [specializationId, setSpecializationId] = useState("");
    const [sessionSchedules, setSessionSchedules] = useState<ISessionSchedule[]>([])

   


  const { trainerInfo } = useSelector((state: RootState) => state.trainer);
  const trainerId = trainerInfo.id;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecializationId(e.target.value); 
  }
  const handleSessionTypeChange = (type: string) => {
    setSessionType(type);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSessionData = {
      ...formData,
      type: sessionType,
      status: "Pending" ,
      specializationId: specializationId,
    };
    try {
      const response=await axiosinstance.post(`${API_URL}/api/trainer/session/${trainerId}`,newSessionData)
      
      const newSchedule= response.data.sessioncreated
      console.log("gottttttt",newSchedule)
      setSessionSchedules((prevSchedules) =>
        Array.isArray(newSchedule)
          ? [...prevSchedules, ...newSchedule]
          : [...prevSchedules, newSchedule]
      );

      if (response.status === 201) {
        toast.success("Session created successfully");
      }
    } catch (error) {
      
    }
    setShowModal(false);

    

    setFormData({
      selectedDate: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      specialization: "",
      price: 0, // Reset price
    });
    setSessionType("Single");
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      selectedDate: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      specialization: "",
      price: 0, // Reset price
    });
    setSessionType("Single");
    setShowModal(false);
  };

  const handleOpenModal = async () => {
    try {
      setShowModal(true);
      const response = await axiosinstance.get(`/api/trainer/specializations/${trainerId}`);
      setSpec(response.data.data.specializations);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  const handleDelete = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log("inside useffect.....")
    const fetchSessionData = async () => {
       
      try {
        console.log("ya")
        const response = await axiosinstance.get(
          `${API_URL}/api/trainer/shedules/${trainerId}`
        );

        console.log("yaaaaaaaaaaaa",response)
        const schedules = response.data.sheduleData;
        // console.log("schedules", schedules);

        setSessionSchedules(schedules);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
        toast.error("Failed to fetch schedules");
      } finally {
     
      }
    };
    fetchSessionData();
  }, []);

  return (
    <div className="min-h-screen bg-white py-4 px-4">
      <button
        onClick={handleOpenModal}
        className="mt-2 px-4 py-3 bg-gradient-to-r from-[#674964] to-[#c780af] text-white text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Add New Schedule
      </button>

      {showModal && (
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#8e898e] p-6 rounded-lg w-1/4 shadow-lg flex flex-col space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#572c52]">Add Session Details</h2>
                <label className="block mt-4">
                  <span className="text-lg font-bold text-[#572c52]">Specialization</span>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Specialization</option>
                    {spec.map((special) => (
                      <option key={special._id} value={special._id}>
                        {special.name}
                      </option>
                    ))}
                  </select>
                </label>

                {sessionType === "Single" && (
                  <>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">Date</span>
                      <input
                        type="date"
                        name="selectedDate"
                        value={formData.selectedDate}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">Start Time</span>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">End Time</span>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                  </>
                )}

                {sessionType === "Package" && (
                  <>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">Start Date</span>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">End Date</span>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">Start Time</span>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block mt-4">
                      <span className="text-lg font-bold text-[#572c52]">End Time</span>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                      />
                    </label>
                  </>
                )}

                <label className="block mt-4">
                  <span className="text-lg font-bold text-[#572c52]">Price</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </label>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#572c52]">Select Type</h2>
                <div className="mt-4">
                  <label className="block">
                    <input
                      type="radio"
                      name="type"
                      value="Single"
                      checked={sessionType === "Single"}
                      onChange={() => handleSessionTypeChange("Single")}
                      className="mr-2"
                    />
                    Single Session
                  </label>
                  <label className="block mt-2">
                    <input
                      type="radio"
                      name="type"
                      value="Package"
                      checked={sessionType === "Package"}
                      onChange={() => handleSessionTypeChange("Package")}
                      className="mr-2"
                    />
                    Package Session
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 ">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2  bg-gray-400 -mt-12 text-white font-semibold rounded-full shadow transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r -mt-12 from-[#572c52] to-[#7b4373] text-white font-semibold rounded-full shadow transform hover:scale-105 transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Scheduled Sessions Table */}
      <div className="mt-1">
        <h2 className="text-2xl font-bold text-[#725e70] mb-4 text-center">
          Scheduled Sessions
        </h2>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-[#572c52] text-white">
              {/* <th className="py-3 px-6 text-center">specialization</th> */}
              <th className="py-3 px-6 text-center">Session Type</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Start Time</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Price</th> 
              {/* <th className="py-3 px-6 text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            
          {/* <td className="py-3 px-6 text-center">{specialization}</td> */}
            {sessionSchedules.map((session, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6 text-center">{session.type}</td>
                <td className="py-3 px-6 text-center">
  {new Date(session.selectedDate || session.startDate).toLocaleDateString(undefined, { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  })}
</td>
                <td className="py-3 px-6 text-center">{session.startTime}</td>
                <td className="py-3 px-6 text-center">{session.status}</td>
                <td className="py-3 px-6 text-center">{session.price}</td> {/* Display Price */}
                <td className="py-3 px-6 text-center">
                  {/* <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full transform hover:scale-105 transition-all duration-300"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleSessions;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

