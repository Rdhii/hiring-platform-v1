import React from "react";

export default function JobDetail() {
  return (
    <div className="border mr-26 my-10 w-full p-6 rounded-lg border-[#E0E0E0] min-h-screen flex flex-col">
      <div className="flex justify-between items-start border-b pb-6 border-[#E0E0E0]">
        <div className="flex gap-6">
          <img
            src="../../../public/63_human_verify.jpg"
            className="size-12 border rounded-sm border-gray-300"
          />
          <div className="">
            <p className="bg-[#43936C] text-white px-2 py-0.5 w-fit rounded-sm mb-2 text-[14px]">
              Full-Time
            </p>
            <p className="text-[18px] font-bold">UX Designer</p>
            <p className="text-[14px] text-[#757575]">Rakamin</p>
          </div>
        </div>
        <button className="bg-[#FBC037] rounded-lg px-4 py-1 text-[14px] cursor-pointer hover:bg-[#E0A800] font-semibold">Apply</button>
      </div>
      <div className="mt-6 ">
        <ul className="list-disc pl-6  text-[14px] leading-relaxed text-[#404040]">
          <li>Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.</li>
          <li>Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.</li>
          <li>Integrate front-end components with APIs and backend services.</li>
          <li>Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.</li>
        </ul>
      </div>
    </div>
  );
}
