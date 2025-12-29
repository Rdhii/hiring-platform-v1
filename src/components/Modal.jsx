import { X } from "lucide-react";
import React, { useState } from "react";
import Select from "react-select";

export default function Modal() {
  const [selectedJobType, setSelectedJobType] = useState(null);

  const options = [
    { value: "full-time", label: "Full-time" },
    { value: "contract", label: "Contract" },
    { value: "part-time", label: "Part-time" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#d1d5db",
      borderRadius: "0.5rem",
      padding: "0.25rem",
      fontSize: "1rem",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#01959F" : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
  };

  return (
    <div className="flex flex-col w-225 h-195 border rounded-xl mx-auto my-15">
      <div className="flex items-center justify-between p-6 border-b border-gray-300">
        <p className="font-medium">Job Opening</p>
        <X className="size-5" />
      </div>
      <div className="flex flex-col p-6 gap-4">
        <label className="text-sm">Job Name*</label>
        <input
          className="border border-gray-300 rounded-lg placeholder-gray-500 px-4 py-2"
          placeholder="Ex. Front End Engineer"
        />
        <label>Job Type*</label>
        <Select
          options={options}
          placeholder="Select job type"
          styles={customStyles}
          value={selectedJobType}
          onChange={setSelectedJobType}
        />
        <label>Job Description*</label>
        <textarea
          className="border border-gray-300 rounded-lg placeholder-gray-500 px-4 py-2 resize-none h-22"
          placeholder="Ex."
        />
        <label>Number of Candidate Needed*</label>
        <input
          className="border border-gray-300 rounded-lg placeholder-gray-500 px-4 py-2"
          placeholder="Ex. 2"
        />
        <label>Job Salary</label>
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <label>Minimum Estimated Salary</label>
            <div className="border w-100 border-gray-300 rounded-lg placeholder-gray-500 px-4 py-2">
              <span className="mr-2">Rp</span>
              <input className="outline-none w-80" placeholder="7.000.000" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label>Maximum Estimated Salary</label>
            <div className="border w-100 border-gray-300 rounded-lg placeholder-gray-500 px-4 py-2">
              <span className="mr-2">Rp</span>
              <input className="outline-none w-80" placeholder="8.000.000" />
            </div>
          </div>
        </div>
      </div>
      <div className="border mx-6">
        <label>Minimum Profile Information Required</label>
        <div>
            <div>
                <label>Full name</label>
                <input type="radio" />
            </div>
        </div>
      </div>
    </div>
  );
}
