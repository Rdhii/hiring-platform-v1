import { Link } from "react-router-dom";

export default function JobDetail({ job }) {
  if (!job) return null;

  return (
    <div className="border mr-26 mb-10 w-full p-6 rounded-lg border-[#E0E0E0] min-h-screen flex flex-col">
      <div className="flex justify-between items-start border-b pb-6 border-[#E0E0E0]">
        <div className="flex gap-6">
          <img
            src="63_human_verify.jpg"
            className="size-12 border rounded-sm border-gray-300"
          />
          <div className="">
            <p className="bg-[#43936C] text-white px-2 py-0.5 w-fit rounded-sm mb-2 text-[14px]">
              {job.jobType}
            </p>
            <p className="text-[18px] font-bold">{job.jobName}</p>
            <p className="text-[14px] text-[#757575]">Rakamin</p>
          </div>
        </div>
        <Link
          to={`/resume/${job.id}`}
          className="bg-[#FBC037] rounded-lg px-4 py-1 text-[14px] cursor-pointer hover:bg-[#E0A800] font-semibold"
        >
          Apply
        </Link>
      </div>
      <div className="mt-6 ">
        <ul className="list-disc pl-6  text-[14px] leading-relaxed text-[#404040]">
          {job.jobDescription
            ?.split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
