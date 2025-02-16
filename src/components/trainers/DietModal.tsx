import React, { useState, useEffect } from "react";
import { DietPlan } from "../../types/trainer"; // Assuming you have a DietPlan type
import { Toaster, toast } from "react-hot-toast";


interface DietModalProps {
    showModal: boolean;
    handleClose: () => void;
    dietPlan: DietPlan;
    setDietPlan: (newDietPlan: DietPlan) => void;
    setSaveTriggered: React.Dispatch<React.SetStateAction<boolean>>;
}

const DietModal: React.FC<DietModalProps> = ({ showModal, handleClose, dietPlan, setDietPlan, setSaveTriggered }) => {
    const [editedDietPlan, setEditedDietPlan] = useState<DietPlan>({ ...dietPlan });
    const [changes, setChanges] = useState<Partial<DietPlan>>({});

    useEffect(() => {
        setEditedDietPlan(dietPlan);
        setChanges({});
    }, [dietPlan]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      setEditedDietPlan((prev) => ({ ...prev, [name]: value }));
  
      // Track only changed fields
      setChanges((prev) => ({
          ...prev,
          [name]: dietPlan[name as keyof DietPlan] !== value ? value : undefined,
      }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorMessage = "";

    for (const [key, value] of Object.entries(editedDietPlan)) {
        if (value.trim() === "") {
            errorMessage = "Fill all fields";
            break; 
        }
        if (key.toLowerCase() === "calories" && value.trim() !== "" && isNaN(Number(value))) {
            errorMessage = "Calories must be a number!";
            break; 
        }
    }

    if (errorMessage) {
        toast.error(errorMessage);
        return;
    }

    setDietPlan(editedDietPlan);
    setSaveTriggered(true);
    handleClose();
};


  

    

    if (!showModal) return null;

    return (
        <>
            <Toaster />
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg w-2/3 shadow-xl flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#572c52]">Diet Plan</h2>
                        <button onClick={handleClose} className="text-[#572c52] text-lg font-semibold hover:text-[#7b4373]">
                            ✖
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        {Object.entries(editedDietPlan).map(([key, value]) => (
                            <label key={key} className="flex flex-col">
                                <span className="text-lg font-bold text-[#572c52] capitalize">{key}</span>
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                                />
                            </label>
                        ))}
                        <button type="submit" className="px-6 py-2 bg-[#572c52] text-white">Save</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default DietModal;
