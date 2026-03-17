import axios from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";

export default function JobLists({ handleOpenModal }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

      const formatedDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

  if (loading) {
    return  <div className="text-center mt-10">Loading...</div>;
  }

  if (jobs.length === 0) {
    return <HeroSection handleOpenModal={handleOpenModal} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="flex flex-col m-5 shadow-xl rounded-2xl">
          <div className="flex items-center gap-4 mx-6 mt-6 mb-3 text-sm">
            <p className="border px-4 py-1 text-[#43936C] font-medium rounded-lg bg-[#F8FBF9] border-[#B8DBCA]">
              {job.jobType}
            </p>
            <p className="border px-4 py-1 border-[#E0E0E0] rounded-sm">started on {formatedDate(job.createdAt)}
            </p>
          </div>
          <div className="mx-6 mb-6 flex flex-col gap-2">
            <p className="font-medium">{job.jobName}</p>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <p className="text-[#616161]">{formatCurrency(job.minimumSalary)} - </p>
                <p className="text-[#616161]">{formatCurrency(job.maximumSalary)}</p>
              </div>
              <Link
                to={`/admin/jobs/${job.id}/candidates`}
                className="flex items-end bg-[#01959F] text-white px-4 py-1 text-sm rounded-lg hover:bg-[#017A82]"
              >
                Manage Job
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
