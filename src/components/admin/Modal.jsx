import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

export default function Modal({ openModal, setOpenModal }) {
  const [selectedJobType, setSelectedJobType] = useState(null);

  const [profileRequirements, setProfileRequirements] = useState({
    fullName: "Mandatory",
    photoProfile: "Mandatory",
    gender: "Optional",
    domicile: "Optional",
    email: "Mandatory",
    phoneNumber: "Mandatory",
    linkedinLink: "Optional",
    dateOfBirth: "Optional",
  });

  const handleRequirementChange = (field, value) => {
    setProfileRequirements((prev) => ({ ...prev, [field]: value }));
  };

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

  const closeModal = () => {
    setOpenModal(false);
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${!openModal ? "hidden" : ""}`}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white flex flex-col w-225 max-h-[80vh] border border-gray-300 rounded-xl shadow-2xl">
      <div className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 z-50">
        <p className="font-medium">Job Opening</p>
        <X onClick={closeModal} className="size-5 cursor-pointer" />
      </div>
      <div className="overflow-y-auto">
      <div className="flex flex-col p-6 gap-4 ">
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
      <div className="border mx-6 p-4 rounded-lg border-gray-300">
        <label>Minimum Profile Information Required</label>
        <div className="m-4 ">
          {[
            { key: "fullName", label: "Full Name" },
            { key: "photoProfile", label: "Photo Profile" },
            { key: "gender", label: "Gender"},
            { key: "domicile", label: "Domicile" },
            { key: "email", label: "Email" },
            { key: "phoneNumber", label: "Phone Number" },
            { key: "linkedinLink", label: "LinkedIn Link" },
            { key: "dateOfBirth", label: "Date of Birth" },
          ].map(({ key, label}) => (
            <div key={key}
              className="flex justify-between items-center border-b border-gray-200 px-2 py-3">
                <label>{label}</label>
                <div className="flex gap-2">
                  {["Mandatory", "Optional", "Off"].map((item) => (
                    <button key={item} onClick={() => handleRequirementChange(key, item)}
                      className={`px-4 py-1 rounded-full border  ${
                        profileRequirements[key] === item ? "text-[#01959F]" : "border-gray-300"
                      }`}>
                      {item}
                    </button>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="flex justify-end border-t mt-6 border-gray-300 sticky bottom-0  z-50">
      <button className="m-6 px-4 py-1 bg-[#01959F] rounded-lg text-white disabled:bg-gray-300 disabled:text-gray-500">Publish Job</button>
      </div>
      </div>
    </div>
  );
}
