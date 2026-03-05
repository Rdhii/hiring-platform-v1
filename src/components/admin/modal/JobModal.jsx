import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import JobForm from "./JobForm";
import { jobSchema } from "./jobSchema";

export default function JobModal({ openModal, setOpenModal }) {
  const [loading, setLoading] = useState(false);

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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      jobName: "",
      jobType: null,
      jobDescription: "",
      candidateNeeded: "",
      minimumSalary: "",
      maximumSalary: "",
    },
  });

  const handleRequirementChange = (field, value) => {
    setProfileRequirements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const closeModal = () => {
    reset();
    setOpenModal(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        jobName: data.jobName,
        jobType: data.jobType.value,
        jobDescription: data.jobDescription,
        candidateNeeded: parseInt(data.candidateNeeded),
        minimumSalary: parseFloat(data.minimumSalary.replace(/\./g, "")),
        maximumSalary: parseFloat(data.maximumSalary.replace(/\./g, "")),
        profileRequired: profileRequirements,
      };

      console.log("Sending payload:", payload);

      await axios.post("http://localhost:4000/api/jobs/create", payload);

      reset();
      setOpenModal(false);

      alert("Job published successfully!");
    } catch (error) {
      console.error("Error publishing job:", error.response?.data || error);

      alert(`Failed: ${error.response?.data?.error || "Server error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        !openModal ? "hidden" : ""
      }`}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white flex flex-col w-225 max-h-[80vh] border border-gray-300 rounded-xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 z-50">
          <p className="font-medium">Job Opening</p>

          <X onClick={closeModal} className="size-5 cursor-pointer" />
        </div>

        {/* Form */}
        <div className="overflow-y-auto">
          <JobForm
            register={register}
            control={control}
            errors={errors}
            profileRequirements={profileRequirements}
            handleRequirementChange={handleRequirementChange}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t mt-6 border-gray-300 sticky bottom-0 z-50">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            disabled={loading}
            className="m-6 px-4 py-1 bg-[#01959F] rounded-lg text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            {loading ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </div>
    </div>
  );
}