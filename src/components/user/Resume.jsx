import { ArrowLeftIcon, Upload } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Resume() {

  const [imagePreview, setImagePreview] = useState("/default-profile.jpg");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
    <div className="flex flex-col my-12.5 border w-175 ">
      <div className="flex items-center gap-4 px-10 pt-10 pb-6">
        <ArrowLeftIcon className="size-5 border border-gray-300 rounded-lg shadow-xl" />
        <p>Apply Front End at Rakamin</p>
      </div>
      <div className="px-6 space-y-4">
        <p className="text-sm text-[#E11428] font-semibold mb-4">* Required</p>
        <h3 className="text-[#404040] font-semibold">Photo Profile</h3>
        <div className=" py-6">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview Image" className="w-32 h-32 rounded-full object-cover mb-4" />
          ) : (
            <div>
              <span className="text-sm text-gray-500">No image selected</span>
            </div>
          )}
          <label className="flex items-center py-2 px-4 border border-gray-300 rounded-lg w-fit">
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
          <label className="text-sm">Full name<span className="text-[#E11428]">*</span></label>
          <input type="text" placeholder="Enter your full name" className="border px-4 py-2 rounded-lg border-gray-300" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Date of birth<span className="text-[#E11428]">*</span></label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select your date of birth"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={new Date()}
            className="border px-4 py-2 rounded-lg border-gray-300 w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Pronoun (gender)<span className="text-[#E11428]">*</span></label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="gender" 
                value="female"
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-sm">She/her (Female)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="gender" 
                value="male"
                className="w-5 h-5 cursor-pointer"
              />
              <span className="text-sm">He/him (Male)</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}
