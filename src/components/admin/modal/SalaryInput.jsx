export default function SalaryInput({
  label,
  register,
  name,
  error,
  placeholder
}) {
  return (
    <div className="flex flex-col gap-4">
      <label>{label}</label>

      <div
        className={`border rounded-lg px-4 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className="mr-2">Rp</span>
        <input
          {...register(name)}
          className="outline-none w-full"
          placeholder={placeholder}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}