import Navbar from "../components/user/Navbar";
import EmptyState from "../components/user/EmptyState";
import JobItem from "../components/user/JobItem";
import JobDetail from "../components/user/JobDetail";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserPage() {
  const [jobItems, setJobItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/jobs/");
        setJobItems(response.data);
        if (response.data.length > 0) {
          setSelectedId(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/jobs/${selectedId}`);
        setJobDetail(response.data);
      } catch (error) {
        console.error("Error fetching job detail:", error);
      }
    };
    fetchJobDetail();
  }, [selectedId]);

  const selectedJob = selectedId ? jobItems.find((j) => j.id === selectedId) : null;
  const isEmpty = jobItems.length === 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mt-10 text-center">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {isEmpty ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <div className="flex gap-6 mt-10 px-26 mb-10">
          <div className="space-y-4 w-[384px] shrink-0">
            {jobItems.map((job) => (
              <JobItem
                key={job.id}
                job={job}
                isActive={job.id === selectedId}
                onClick={() => setSelectedId(job.id)}
              />
            ))}
          </div>
          <JobDetail job={jobDetail || selectedJob} />
        </div>
      )}
    </>
  );
}