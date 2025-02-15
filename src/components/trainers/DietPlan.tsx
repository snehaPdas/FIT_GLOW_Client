import React, { useEffect, useState } from "react";
import trainerAxiosInstance from "../../../axios/trainerAxiosInstance";
import { User } from "../../types/user";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import DietModal from "../../components/trainers/DietModal";

// Define DietPlan type
export interface DietPlan {
    morning: string;
    lunch: string;
    evening: string;
    night: string;
    totalCalories: string;
}

function DietPlan() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [dietPlans, setDietPlans] = useState<{ [userId: string]: DietPlan }>({});
    const [saveTriggered, setSaveTriggered] = useState(false);

    // Get trainer info from Redux store
    const trainerinfo = useSelector((state: RootState) => state.trainer);
    const trainerId = trainerinfo?.trainerInfo?.id;

    useEffect(() => {
        if (!trainerId) return;

        const fetchUsers = async () => {
            try {
                const response = await trainerAxiosInstance.get(`/api/trainer/bookingdetails/${trainerId}`);
                const seenUserId = new Set();
                const uniqueUsers = response.data.data.filter((booking: any) => {
                    if (!booking.userId || !booking.userId._id) return false;
                    if (seenUserId.has(booking.userId._id)) return false;
                    seenUserId.add(booking.userId._id);
                    return true;
                });
                setUsers(uniqueUsers.map((booking: any) => ({ userId: booking.userId, bookingId: booking._id })));
            } catch (error: any) {
                console.error("Error fetching trainer:", error.response?.data || error.message);
            }
        };

        fetchUsers();
    }, [trainerId]);

    useEffect(() => {
        if (!selectedUser) return;

        const fetchUserDetails = async () => {
            try {
                const response = await trainerAxiosInstance.get(`/api/trainer/users/${selectedUser.userId._id}`);
                setUserDetails(response.data);
            } catch (error: any) {
                console.error("Error fetching user details:", error.response?.data || error.message);
            }
        };

        fetchUserDetails();
    }, [selectedUser]);

    const handleDietChange = (userId: string, newDietPlan: DietPlan) => {
        setDietPlans(prev => ({
            ...prev,
            [userId]: newDietPlan,
        }));
    };

    useEffect(() => {
        if (!saveTriggered || !selectedUser) return;

        const saveDietPlan = async () => {
            try {
                console.log("&&&&&&&&&&&&&&&",selectedUser?.userId._id)
                console.log("Selected User ID:", selectedUser?.userId._id);
                console.log("Diet Plan to save:", dietPlans[selectedUser.userId._id]);
                await trainerAxiosInstance.post(
                    `/api/trainer/store-diet-plan/${selectedUser?.userId._id}`,
                    { ...dietPlans[selectedUser.userId._id], trainerId } // Include trainerId in the request body
                );
                console.log("Diet plan saved:", dietPlans[selectedUser.userId._id]);
            } catch (error) {
                console.error("Error saving diet plan:", error);
            } finally {
                setSaveTriggered(false);
            }
        };

        saveDietPlan();
    }, [saveTriggered, selectedUser, dietPlans]);

    return (
        <div className="max-w-5xl mx-auto mt-10 p-10 bg-white shadow-xl rounded-2xl">
            <h1 className="text-4xl font-bold text-center text-[#572c52] mb-10">Diet Management</h1>
            <div className="overflow-x-auto max-w-3xl mx-auto rounded-xl shadow-md border border-gray-200 bg-white">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-[#572c52] text-white text-lg">
                            <th className="py-5 px-6 text-left rounded-tl-xl font-semibold">Name</th>
                            <th className="py-5 px-6 text-center rounded-tr-xl font-semibold">Diet Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.userId._id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                                    <td className="py-5 px-6 border-b border-gray-300 text-lg text-gray-800">{user.userId.name}</td>
                                    <td className="py-5 px-6 border-b border-gray-300 text-center">
                                        <button
                                            className="px-6 py-3 rounded-lg bg-[#572c52] text-white hover:bg-[#6e3d68]"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center py-8 text-gray-500 text-lg">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedUser && (
                <DietModal
                    showModal={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    userDetails={userDetails}
                    dietPlan={dietPlans[selectedUser.userId._id] || { morning: "", lunch: "", evening: "", night: "", totalCalories: "" }}
                    setDietPlan={(newDietPlan) => handleDietChange(selectedUser.userId._id, newDietPlan)}
                    setSaveTriggered={setSaveTriggered}  
                />
            )}
        </div>
    );
}

export default DietPlan;
