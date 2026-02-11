import axios from "axios";
import { ArrowLeftIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

const createDynamicSchema = (profileRequired) => {
  const schemaFields = {};

  // Photo Profile
  if (profileRequired.photoProfile !== "Off") {
    schemaFields.profilePhoto = yup.mixed().nullable();
    if (profileRequired.photoProfile === "Mandatory") {
      schemaFields.profilePhoto = yup
        .mixed()
        .required("Photo profile is required");
    }
  }

  // Full Name
  if (profileRequired.fullName !== "Off") {
    schemaFields.fullName = yup.string().nullable();
    if (profileRequired.fullName === "Mandatory") {
      schemaFields.fullName = schemaFields.fullName.required(
        "Full name is required",
      );
    }
  }

  // Date of Birth
  if (profileRequired.dateOfBirth !== "Off") {
    schemaFields.dateOfBirth = yup.date().nullable();
    if (profileRequired.dateOfBirth === "Mandatory") {
      schemaFields.dateOfBirth = schemaFields.dateOfBirth.required(
        "Date of birth is required",
      );
    }
  }

  // Gender
  if (profileRequired.gender !== "Off") {
    schemaFields.gender = yup.string();
    if (profileRequired.gender === "Mandatory") {
      schemaFields.gender = schemaFields.gender.required("Gender is required");
    }
  }

  // Domicile (controls both province and city)
  if (profileRequired.domicile !== "Off") {
    schemaFields.province = yup.string();
    schemaFields.city = yup.string();
    if (profileRequired.domicile === "Mandatory") {
      schemaFields.province = schemaFields.province.required(
        "Province is required",
      );
      schemaFields.city = schemaFields.city.required("City is required");
    }
  }

  // Phone Number
  if (profileRequired.phoneNumber !== "Off") {
    schemaFields.phoneNumber = yup
      .string()
      .min(10, "Please enter a valid phone number");
    if (profileRequired.phoneNumber === "Mandatory") {
      schemaFields.phoneNumber = schemaFields.phoneNumber.required(
        "Phone number is required",
      );
    }
  }

  // Email
  if (profileRequired.email !== "Off") {
    schemaFields.email = yup.string().email("Invalid email format");
    if (profileRequired.email === "Mandatory") {
      schemaFields.email = schemaFields.email.required("Email is required");
    }
  }

  // LinkedIn
  if (profileRequired.linkedinLink !== "Off") {
    schemaFields.linkedin = yup.string().url("Invalid URL format");
    if (profileRequired.linkedinLink === "Mandatory") {
      schemaFields.linkedin = schemaFields.linkedin.required(
        "LinkedIn profile is required",
      );
    }
  }

  return yup.object().shape(schemaFields);
};

export default function Resume() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Job data states
  const [jobDetails, setJobDetails] = useState(null);
  const [profileRequired, setProfileRequired] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [imagePreview, setImagePreview] = useState("/default-profile.jpg");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("id");

  // Helper functions for field visibility
  const isFieldVisible = (fieldName) => {
    if (!profileRequired) return true;
    return profileRequired[fieldName] !== "Off";
  };

  const isFieldMandatory = (fieldName) => {
    if (!profileRequired) return false;
    return profileRequired[fieldName] === "Mandatory";
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: {
      fullName: "",
      dateOfBirth: null,
      gender: "",
      province: "",
      city: "",
      phoneNumber: "62",
      email: "",
      linkedin: "",
      profilePhoto: null,
    },
  });

  const selectedProvince = watch("province");

  // Fetch job details from API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/jobs/${jobId}`);
        setJobDetails(response.data);

        // Extract profileRequired (it's an array in response)
        if (
          response.data.profileRequired &&
          response.data.profileRequired.length > 0
        ) {
          setProfileRequired(response.data.profileRequired[0]);
        } else {
          // Fallback: all mandatory if no settings found
          setProfileRequired({
            fullName: "Mandatory",
            photoProfile: "Mandatory",
            gender: "Mandatory",
            domicile: "Mandatory",
            email: "Mandatory",
            phoneNumber: "Mandatory",
            linkedinLink: "Mandatory",
            dateOfBirth: "Mandatory",
          });
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job requirements");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  // Generate dynamic validation schema
  useEffect(() => {
    if (profileRequired) {
      const schema = createDynamicSchema(profileRequired);
      setValidationSchema(schema);
    }
  }, [profileRequired]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://ibnux.github.io/data-indonesia/provinsi.json",
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        try {
          const response = await axios.get(
            `https://ibnux.github.io/data-indonesia/kabupaten/${selectedProvince}.json`,
          );
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Filter out empty/undefined values from hidden fields
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      const payload = {
        jobId: parseInt(jobId),
        ...filteredData,
        dateOfBirth: data.dateOfBirth
          ? data.dateOfBirth.toISOString()
          : undefined,
      };

      console.log("Submitting application:", payload);

      // TODO: Replace with actual API call
      // await axios.post('/applications', payload);

      alert("Application submitted successfully!");
      navigate("/user");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="mt-12.5 border border-gray-300 w-175 p-10">
          <p className="text-center">Loading job requirements...</p>
        </div>
      ) : error ? (
        <div className="mt-12.5 border border-gray-300 w-175 p-10">
          <p className="text-center text-red-500">{error}</p>
          <button
            onClick={() => navigate("/user")}
            className="mt-4 px-4 py-2 bg-[#01959F] text-white rounded-lg mx-auto block"
          >
            Back to Jobs
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-12.5 border border-gray-300 w-175 ">
            <div className="flex items-center gap-4 px-10 pt-10 pb-6">
              <button className="cursor-pointer hover:scale-125 transition-transform">
                <ArrowLeftIcon className="size-5 border border-gray-300 rounded-lg shadow-xl" />
              </button>
              <p>Apply {jobDetails?.jobName || "Job"} at Rakamin</p>
            </div>
            <div className="px-6 space-y-4">
              <p className="text-sm text-[#E11428] font-semibold mb-4">
                * Required
              </p>
              {isFieldVisible("photoProfile") && (
                <>
                  <h3 className="text-[#404040] font-semibold">
                    Photo Profile
                    {isFieldMandatory("photoProfile") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </h3>
                  <div className=" py-6">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview Image"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                      />
                    ) : (
                      <div>
                        <span className="text-sm text-gray-500">
                          No image selected
                        </span>
                      </div>
                    )}
                    <label className="flex items-center py-2 px-4 border border-gray-300 rounded-lg w-fit cursor-pointer hover:bg-gray-100 shadow-sm">
                      <Upload className="size-5" />
                      <span className="p-1">Take a Picture</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </>
              )}
              {isFieldVisible("fullName") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Full name
                    {isFieldMandatory("fullName") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="border px-4 py-2 rounded-lg border-gray-300"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              )}
              {isFieldVisible("dateOfBirth") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Date of birth
                    {isFieldMandatory("dateOfBirth") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select your date of birth"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        maxDate={new Date()}
                        className="border px-4 py-2 rounded-lg border-gray-300 w-full"
                      />
                    )}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              )}
              {isFieldVisible("gender") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Pronoun (gender)
                    {isFieldMandatory("gender") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="male"
                        className="w-5 h-5 cursor-pointer"
                        {...register("gender")}
                      />
                      <span className="text-sm">He/him (Male)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="female"
                        className="w-5 h-5 cursor-pointer"
                        {...register("gender")}
                      />
                      <span className="text-sm">She/her (Female)</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
              {isFieldVisible("domicile") && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">
                      Province
                      {isFieldMandatory("domicile") && (
                        <span className="text-[#E11428]">*</span>
                      )}
                    </label>
                    <select
                      {...register("province")}
                      onChange={(e) => {
                        setValue("province", e.target.value);
                        setValue("city", "");
                      }}
                      className="border px-4 py-2 rounded-lg border-gray-300"
                    >
                      <option value="">Choose your province</option>
                      {provinces.map((prov) => (
                        <option key={prov.id} value={prov.id}>
                          {prov.nama}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-sm">
                        {errors.province.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">
                      Domicile
                      {isFieldMandatory("domicile") && (
                        <span className="text-[#E11428]">*</span>
                      )}
                    </label>
                    <select
                      {...register("city")}
                      className="border px-4 py-2 rounded-lg border-gray-300"
                      disabled={!selectedProvince}
                    >
                      <option value="">Choose your city</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.nama}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              {isFieldVisible("phoneNumber") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Phone number
                    {isFieldMandatory("phoneNumber") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <PhoneInput
                        country={selectedCountry}
                        value={field.value}
                        onChange={(phone, data) => {
                          const countryCode = data.dialCode;
                          if (phone && phone.startsWith(countryCode)) {
                            field.onChange(phone);
                          } else if (phone === "" || phone === "+") {
                            field.onChange(countryCode);
                          } else {
                            field.onChange(
                              countryCode +
                                phone
                                  .replace(/\D/g, "")
                                  .replace(new RegExp(`^${countryCode}`), ""),
                            );
                          }
                        }}
                        onCountryChange={(phone, data) => {
                          setSelectedCountry(data.countryCode.toLowerCase());
                          field.onChange(data.dialCode);
                        }}
                        placeholder="81XXXXX"
                        disableDropdown={false}
                        countryCodeEditable={false}
                        inputStyle={{
                          width: "100%",
                          height: "42px",
                          fontSize: "14px",
                          paddingLeft: "48px",
                          borderRadius: "8px",
                          border: "1px solid #d1d5db",
                        }}
                        buttonStyle={{
                          borderRadius: "8px 0 0 8px",
                          border: "1px solid #d1d5db",
                        }}
                        dropdownStyle={{
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              )}
              {isFieldVisible("email") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Email
                    {isFieldMandatory("email") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="border px-4 py-2 rounded-lg border-gray-300"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
              {isFieldVisible("linkedinLink") && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Link Linkedin
                    {isFieldMandatory("linkedinLink") && (
                      <span className="text-[#E11428]">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/username"
                    className={clsx(
                      "border px-4 py-2 rounded-lg border-gray-300",
                      errors.linkedin ? "mb-0" : "mb-8",
                    )}
                    {...register("linkedin")}
                  />
                  {errors.linkedin && (
                    <p className="text-red-500 text-sm">
                      {errors.linkedin.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mb-12 mt-6 mx-10 w-full flex justify-center hover:scale-102 transition-transform">
            <button
              className=" px-70.5 py-1.5 bg-[#01959F] text-white rounded-lg cursor-pointer"
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
