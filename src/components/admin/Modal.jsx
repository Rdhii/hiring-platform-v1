// import { X } from "lucide-react";
// import { useState } from "react";
// import Select from "react-select";
// import axios from "axios";
// import * as yup from "yup";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   jobName: yup.string().required("Job name is required"),
//   jobType: yup.object().nullable().required("Job type is required"),
//   jobDescription: yup.string().required("Job description is required"),
//   candidateNeeded: yup
//     .number()
//     .typeError("Must be a number")
//     .positive("Must be positive")
//     .integer("Must be an integer")
//     .required("Candidate needed is required"),
//   minimumSalary: yup
//     .string()
//     .required("Minimum salary is required")
//     .test("is-number", "Must be a valid number", (value) => {
//       if (!value) return false;
//       const num = parseFloat(value.replace(/\./g, ""));
//       return !isNaN(num) && num > 0;
//     }),
//   maximumSalary: yup
//     .string()
//     .required("Maximum salary is required")
//     .test("is-number", "Must be a valid number", (value) => {
//       if (!value) return false;
//       const num = parseFloat(value.replace(/\./g, ""));
//       return !isNaN(num) && num > 0;
//     })
//     .test(
//       "is-greater",
//       "Maximum salary must be greater than minimum",
//       function (value) {
//         const { minimumSalary } = this.parent;
//         if (!value || !minimumSalary) return true;
//         const max = parseFloat(value.replace(/\./g, ""));
//         const min = parseFloat(minimumSalary.replace(/\./g, ""));
//         return max > min;
//       },
//     ),
// });

// export default function Modal({ openModal, setOpenModal }) {
//   const [Loading, setLoading] = useState(false);
//   const [profileRequirements, setProfileRequirements] = useState({
//     fullName: "Mandatory",
//     photoProfile: "Mandatory",
//     gender: "Optional",
//     domicile: "Optional",
//     email: "Mandatory",
//     phoneNumber: "Mandatory",
//     linkedinLink: "Optional",
//     dateOfBirth: "Optional",
//   });
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       jobName: "",
//       jobType: null,
//       jobDescription: "",
//       candidateNeeded: "",
//       minimumSalary: "",
//       maximumSalary: "",
//     },
//   });

//   const handleRequirementChange = (field, value) => {
//     setProfileRequirements((prev) => ({ ...prev, [field]: value }));
//   };

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const payload = {
//         jobName: data.jobName,
//         jobType: data.jobType.value,
//         jobDescription: data.jobDescription,
//         candidateNeeded: parseInt(data.candidateNeeded),
//         minimumSalary: parseFloat(data.minimumSalary.replace(/\./g, "")),
//         maximumSalary: parseFloat(data.maximumSalary.replace(/\./g, "")),
//         profileRequired: profileRequirements,
//       };

//       console.log("Sending payload:", payload);

//       await axios.post("http://localhost:4000/api/jobs/create", payload);

//       reset();
//       setOpenModal(false);
//       alert("Job published successfully!");
//     } catch (error) {
//       console.error("Error publishing job:", error.response?.data || error);
//       alert(`Failed: ${error.response?.data?.error || "Server error"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const options = [
//     { value: "full-time", label: "Full-time" },
//     { value: "contract", label: "Contract" },
//     { value: "part-time", label: "Part-time" },
//     { value: "internship", label: "Internship" },
//     { value: "freelance", label: "Freelance" },
//   ];

//   const customStyles = {
//     control: (base) => ({
//       ...base,
//       borderColor: "#d1d5db",
//       borderRadius: "0.5rem",
//       padding: "0.25rem",
//       fontSize: "1rem",
//       "&:hover": {
//         borderColor: "#9ca3af",
//       },
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected ? "#01959F" : "#fff",
//       color: state.isSelected ? "#fff" : "#000",
//       "&:hover": {
//         backgroundColor: "#f3f4f6",
//       },
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: "#9ca3af",
//     }),
//   };

//   const closeModal = () => {
//     reset();
//     setOpenModal(false);
//   };

//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center z-50 ${!openModal ? "hidden" : ""}`}
//     >
//       <div className="absolute inset-0 bg-black/50"></div>
//       <div className="relative bg-white flex flex-col w-225 max-h-[80vh] border border-gray-300 rounded-xl shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 z-50">
//           <p className="font-medium">Job Opening</p>
//           <X onClick={closeModal} className="size-5 cursor-pointer" />
//         </div>
//         <div className="overflow-y-auto">
//           <div className="flex flex-col p-6 gap-4 ">
//             <label className="text-sm">Job Name*</label>
//             <input
//               {...register("jobName")}
//               className={`border rounded-lg placeholder-gray-500 px-4 py-2 ${
//                 errors.jobName ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Ex. Front End Engineer"
//             />
//             {errors.jobName && (
//               <p className="text-red-500 text-sm">{errors.jobName.message}</p>
//             )}
//             <label>Job Type*</label>
//             <Controller
//               name="jobType"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={options}
//                   placeholder="Select job type"
//                   styles={customStyles}
//                 />
//               )}
//             />
//             {errors.jobType && (
//               <p className="text-red-500 text-sm">{errors.jobType.message}</p>
//             )}
//             <label>Job Description*</label>
//             <textarea
//               {...register("jobDescription")}
//               className={`border rounded-lg placeholder-gray-500 px-4 py-2 resize-none h-22 ${
//                 errors.jobDescription ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Ex."
//             />
//             {errors.jobDescription && (
//               <p className="text-red-500 text-sm">
//                 {errors.jobDescription.message}
//               </p>
//             )}
//             <label>Number of Candidate Needed*</label>
//             <input
//               {...register("candidateNeeded")}
//               className={`border rounded-lg placeholder-gray-500 px-4 py-2 ${
//                 errors.candidateNeeded ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Ex. 2"
//             />
//             {errors.candidateNeeded && (
//               <p className="text-red-500 text-sm">
//                 {errors.candidateNeeded.message}
//               </p>
//             )}
//             <label>Job Salary</label>
//             <div className="flex gap-12">
//               <div className="flex flex-col gap-4">
//                 <label>Minimum Estimated Salary</label>
//                 <div
//                   className={`border w-100 rounded-lg px-4 py-2 ${
//                     errors.minimumSalary ? "border-red-500" : "border-gray-300"
//                   }`}
//                 >
//                   <span className="mr-2">Rp</span>
//                   <input
//                     {...register("minimumSalary")}
//                     className="outline-none w-80"
//                     placeholder="7.000.000"
//                   />
//                 </div>
//                 {errors.minimumSalary && (
//                   <p className="text-red-500 text-sm">
//                     {errors.minimumSalary.message}
//                   </p>
//                 )}
//               </div>
//               <div className="flex flex-col gap-4">
//                 <label>Maximum Estimated Salary</label>
//                 <div
//                   className={`border w-100 rounded-lg px-4 py-2 ${
//                     errors.maximumSalary ? "border-red-500" : "border-gray-300"
//                   }`}
//                 >
//                   <span className="mr-2">Rp</span>
//                   <input
//                     {...register("maximumSalary")}
//                     className="outline-none w-80"
//                     placeholder="8.000.000"
//                   />
//                 </div>
//                 {errors.maximumSalary && (
//                   <p className="text-red-500 text-sm">
//                     {errors.maximumSalary.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="border mx-6 p-4 rounded-lg border-gray-300">
//             <label>Minimum Profile Information Required</label>
//             <div className="m-4 ">
//               {[
//                 { key: "fullName", label: "Full Name" },
//                 { key: "photoProfile", label: "Photo Profile" },
//                 { key: "gender", label: "Gender" },
//                 { key: "domicile", label: "Domicile" },
//                 { key: "email", label: "Email" },
//                 { key: "phoneNumber", label: "Phone Number" },
//                 { key: "linkedinLink", label: "LinkedIn Link" },
//                 { key: "dateOfBirth", label: "Date of Birth" },
//               ].map(({ key, label }) => (
//                 <div
//                   key={key}
//                   className="flex justify-between items-center border-b border-gray-200 px-2 py-3"
//                 >
//                   <label>{label}</label>
//                   <div className="flex gap-2">
//                     {["Mandatory", "Optional", "Off"].map((item) => (
//                       <button
//                         key={item}
//                         onClick={() => handleRequirementChange(key, item)}
//                         className={`px-4 py-1 rounded-full border  ${
//                           profileRequirements[key] === item
//                             ? "text-[#01959F]"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         {item}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end border-t mt-6 border-gray-300 sticky bottom-0  z-50">
//           <button
//               onClick={handleSubmit(onSubmit)}
//               type="submit"
//               disabled={Loading}
//               className="m-6 px-4 py-1 bg-[#01959F] rounded-lg text-white disabled:bg-gray-300 disabled:text-gray-500"
//             >
//               {Loading ? "Publishing..." : "Publish Job"}
//             </button>
//         </div>
//       </div>
//     </div>
//   );
// }
