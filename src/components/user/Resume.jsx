import axios from "axios";
import { ArrowLeftIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

const schema = yup.object().shape({
  profilePhoto: yup.mixed().nullable(),
  fullName: yup.string().required("Full name is required"),
  dateOfBirth: yup.date().required("Date of birth is required").nullable(),
  gender: yup.string().required("Gender is required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(10, "Please enter a valid phone number"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  linkedin: yup
    .string()
    .url("Invalid URL format")
    .required("LinkedIn profile is required"),
});

export default function Resume() {
  const [imagePreview, setImagePreview] = useState("/default-profile.jpg");
  // const [dateOfBirth, setDateOfBirth] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  // const [selectedProvince, setSelectedProvince] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("62");
  const [selectedCountry, setSelectedCountry] = useState("id");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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

  // const handlePhoneChange = (phone, data) => {
  //   // Ambil country code dari data object
  //   const countryCode = data.dialCode;

  //   // Validasi agar country code tidak bisa dihapus
  //   if (phone && phone.startsWith(countryCode)) {
  //     setPhoneNumber(phone);
  //   } else if (phone === "" || phone === "+") {
  //     setPhoneNumber(countryCode);
  //   } else {
  //     // Jika user menghapus country code, kembalikan ke country code yang sesuai
  //     setPhoneNumber(countryCode + phone.replace(/\D/g, "").replace(new RegExp(`^${countryCode}`), ""));
  //   }
  // };

  // const handleCountryChange = (phone, data) => {
  //   // Ketika negara berubah, update country code ke state
  //   setSelectedCountry(data.countryCode.toLowerCase());
  //   setPhoneNumber(data.dialCode);
  // };

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-12.5 border border-gray-300 w-175 ">
        <div className="flex items-center gap-4 px-10 pt-10 pb-6">
          <button className="cursor-pointer hover:scale-125 transition-transform">
            <ArrowLeftIcon className="size-5 border border-gray-300 rounded-lg shadow-xl" />
          </button>
          <p>Apply Front End at Rakamin</p>
        </div>
        <div className="px-6 space-y-4">
          <p className="text-sm text-[#E11428] font-semibold mb-4">
            * Required
          </p>
          <h3 className="text-[#404040] font-semibold">Photo Profile</h3>
          <div className=" py-6">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview Image"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <div>
                <span className="text-sm text-gray-500">No image selected</span>
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
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Full name<span className="text-[#E11428]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border px-4 py-2 rounded-lg border-gray-300"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Date of birth<span className="text-[#E11428]">*</span>
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
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Pronoun (gender)<span className="text-[#E11428]">*</span>
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
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Province<span className="text-[#E11428]">*</span>
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
              <p className="text-red-500 text-sm">{errors.province.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Domicile<span className="text-[#E11428]">*</span>
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
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Phone number<span className="text-[#E11428]">*</span>
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
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Email<span className="text-[#E11428]">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="border px-4 py-2 rounded-lg border-gray-300"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">
              Link Linkedin<span className="text-[#E11428]">*</span>
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
              <p className="text-red-500 text-sm">{errors.linkedin.message}</p>
            )}
          </div>
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
    </div>
  );
}
