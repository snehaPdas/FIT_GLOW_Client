import React, { useState } from "react";
import { TrainerListFilterBarProps } from "../../types/trainer";

function TrainerListFilterBar({ onFilterChange }:TrainerListFilterBarProps) {
  const [filters, setFilters] = useState({
    specialization: "",
    gender: "",
    priceRange: [0, 100],
    language: "",
  });
  

  const handleFilterChange = (key: string, value: string | number[]) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    //onFilterChange(updatedFilters); 
  };

  const handleFilterChangeexp = (key: string, value: number[]) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    //onFilterChange(updatedFilters); 
  };

  return (
    <div className="bg-[#9f909d] shadow-lg rounded-lg p-4 space-y-6 mt-10">
      <h2 className="text-2xl font-semibold text-white">Filter Trainers</h2>

      {/* Specialization Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#572c52] mb-1">
          Specialization
        </label>
        <select
          value={filters.specialization}
          onChange={(e) => handleFilterChange("specialization", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572c52]"
        >
          <option value="">All</option>
          <option value="yoga">Yoga</option>
          <option value="fitness">Fitness</option>
          <option value="meditation">Meditation</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#572c52] mb-1">
          Year of Experience
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) =>
            handleFilterChangeexp("priceRange", [0, parseInt(e.target.value)])
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-white mt-1">
          <span>0</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#572c52] mb-1">Gender</label>
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572c52]"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#572c52] mb-1">
          Price Range
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) =>
            handleFilterChange("priceRange", [0, parseInt(e.target.value)])
          }
          className="w-full"
        />
        <div className="flex justify-between text-sm text-white mt-1">
          <span>$0</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-[#572c52] mb-1">
          Languages spoken
        </label>
        <select
          value={filters.language}
          onChange={(e) => handleFilterChange("language", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572c52]"
        >
          <option value="">All</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>
    </div>
  );
}

export default TrainerListFilterBar;
