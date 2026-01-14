import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JobLists() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/post/");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, [])
   return (
        <div className="flex flex-col gap-4">
            {jobs.map((job) => (
                <div key={job.id} className="flex flex-col m-5 shadow-xl rounded-2xl">
                    <div className="flex items-center gap-4 mx-6 mt-6 mb-3 text-sm">
                        <p className="border px-4 py-1 text-[#43936C] font-medium rounded-lg bg-[#F8FBF9] border-[#B8DBCA]">
                            {job.jobType}
                        </p>
                        <p className="border px-4 py-1 border-[#E0E0E0] rounded-sm">{job.createdAt}</p>
                    </div>
                    <div className="mx-6 mb-6 flex flex-col gap-2">
                        <p className="font-medium">{job.jobName}</p>
                        <div className="flex justify-between">
                            <p className="text-[#616161]">{job.maximumSalary}</p>
                            <Link to="/manage" className="flex items-end bg-[#01959F] text-white px-4 py-1 text-sm rounded-lg hover:bg-[#017A82]">
                                Manage Job
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
