import Navbar from "../components/user/Navbar";
import EmptyState from "../components/user/EmptyState";
import JobItem from "../components/user/JobItem";
import JobDetail from "../components/user/JobDetail";
import { useState } from "react";

export default function UserPage() {
  const jobItems = [
    {
      id: 1,
      title: "UX Designer",
      company: "Rakamin",
      location: "Jakarta Selatan",
      salary: "Rp7.000.000 - Rp15.000.000",
      type: "Full-Time",
      descriptions: [
        "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.",
        "Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.",
        "Integrate front-end components with APIs and backend services.",
        "Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.",
      ],
    },
    {
      id: 2,
      title: "UI Designer",
      company: "Rakamin",
      location: "Jakarta Selatan",
      salary: "Rp5.000.000 - Rp15.000.000",
      type: "Contract",
      descriptions: [
        "Create UI components and design systems aligned with brand guidelines.",
        "Work closely with developers to ensure design feasibility.",
        "Iterate designs based on usability testing and feedback.",
      ],
    },
  ];

  const [selectedId, setSelectedId] = useState(jobItems[0]?.id ?? null);
  const selectedJob = selectedId ? jobItems.find((j) => j.id === selectedId) : null;
  const isEmpty = jobItems.length === 0;

  return (
    <>
      <Navbar />
      {isEmpty ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <div className="flex gap-6 mt-10">
          <div className="space-y-4">
            {jobItems.map((job) => (
              <JobItem
                key={job.id}
                job={job}
                isActive={job.id === selectedId}
                onClick={() => setSelectedId(job.id)}
              />
            ))}
          </div>
          <JobDetail job={selectedJob} />
        </div>
      )}
    </>
  );
}