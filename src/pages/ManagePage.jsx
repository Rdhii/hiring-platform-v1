import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarManage from '../components/admin/NavbarManage'
import EmptyManage from '../components/admin/EmptyManage'
import CandidateList from '../components/admin/CandidateList'

export default function ManagePage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/jobs/${id}/candidates`);
        setCandidates(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [id]);

  if (loading) return <p className="px-5">Loading...</p>;
  if (error) return <p className="px-5 text-red-600">{error}</p>;

  return (
    <div>
      <NavbarManage />
      {candidates.length === 0 ? <EmptyManage /> : <CandidateList candidates={candidates} />}
    </div>
  )
}