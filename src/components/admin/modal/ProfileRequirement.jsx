export default function ProfileRequirement({
  profileRequirements,
  handleRequirementChange
}) {
  const fields = [
    { key: "fullName", label: "Full Name" },
    { key: "photoProfile", label: "Photo Profile" },
    { key: "gender", label: "Gender" },
    { key: "domicile", label: "Domicile" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "linkedinLink", label: "LinkedIn Link" },
    { key: "dateOfBirth", label: "Date of Birth" },
  ];

  return (
    <div className="border mx-4 p-4 rounded-lg border-gray-300">
      <label>Minimum Profile Information Required</label>

      <div className="m-4">
        {fields.map(({ key, label }) => (
          <div
            key={key}
            className="flex justify-between items-center border-b border-gray-300 px-2 py-3"
          >
            <label>{label}</label>

            <div className="flex gap-2">
              {["Mandatory", "Optional", "Off"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleRequirementChange(key, item)}
                  className={`px-4 py-1 rounded-full border ${
                    profileRequirements[key] === item
                      ? "text-[#01959F]"
                      : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}