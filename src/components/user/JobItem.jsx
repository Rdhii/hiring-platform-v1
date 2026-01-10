export default function JobItem({ job, onClick, isActive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border ml-26 rounded-lg border-[#01777F] bg-[#146166]/10 w-[384px] ${
        isActive
          ? "border-[#01777F] bg-[#146166]/10"
          : "border-[#E0E0E0] bg-white"
      } shadow-sm hover:shadow transition`}
    >
        <div className="px-4 py-3 flex gap-4 items-center">
          <img
            className="size-12 border-gray-300 border rounded-sm"
            src="../../../public/63_human_verify.jpg"
          />
          <div>
            <p className="font-bold text-base">{job.title}</p>
            <p className="text-sm">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-start px-4 pb-3 space-y-2 text-sm text-[#616161] border-dotted border-t border-gray-300">
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
    </button>
  );
}
