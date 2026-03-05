import Select from "react-select";
import { Controller } from "react-hook-form";

import SalaryInput from "./SalaryInput";
import ProfileRequirement from "./ProfileRequirement";

import { JOB_TYPE_OPTIONS } from "./jobOptions";
import { selectStyles } from "./selectStyles";

export default function JobForm({
  register,
  control,
  errors,
  profileRequirements,
  handleRequirementChange,
}) {
  return (
    <>
      <div className="flex flex-col p-6 gap-4">

        {/* Job Name */}
        <label className="text-sm">Job Name*</label>
        <input
          {...register("jobName")}
          className={`border rounded-lg px-4 py-2 ${
            errors.jobName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex. Front End Engineer"
        />

        {errors.jobName && (
          <p className="text-red-500 text-sm">{errors.jobName.message}</p>
        )}

        {/* Job Type */}
        <label>Job Type*</label>

        <Controller
          name="jobType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={JOB_TYPE_OPTIONS}
              placeholder="Select job type"
              styles={selectStyles}
            />
          )}
        />

        {errors.jobType && (
          <p className="text-red-500 text-sm">{errors.jobType.message}</p>
        )}

        {/* Job Description */}
        <label>Job Description*</label>

        <textarea
          {...register("jobDescription")}
          className={`border rounded-lg px-4 py-2 resize-none h-22 ${
            errors.jobDescription ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex."
        />

        {errors.jobDescription && (
          <p className="text-red-500 text-sm">
            {errors.jobDescription.message}
          </p>
        )}

        {/* Candidate Needed */}
        <label>Number of Candidate Needed*</label>

        <input
          {...register("candidateNeeded")}
          className={`border rounded-lg px-4 py-2 ${
            errors.candidateNeeded ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex. 2"
        />

        {errors.candidateNeeded && (
          <p className="text-red-500 text-sm">
            {errors.candidateNeeded.message}
          </p>
        )}

        {/* Salary */}
        <label>Job Salary</label>

        <div className="flex gap-12">

          <SalaryInput
            label="Minimum Estimated Salary"
            register={register}
            name="minimumSalary"
            error={errors.minimumSalary}
            placeholder="7.000.000"
          />

          <SalaryInput
            label="Maximum Estimated Salary"
            register={register}
            name="maximumSalary"
            error={errors.maximumSalary}
            placeholder="8.000.000"
          />

        </div>
      </div>

      {/* Profile Requirement */}
      <ProfileRequirement
        profileRequirements={profileRequirements}
        handleRequirementChange={handleRequirementChange}
      />
    </>
  );
}