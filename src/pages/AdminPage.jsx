import Navbar from '../components/Navbar'
import SearchInput from '../components/SearchInput'
import HeroSection from '../components/HeroSection'
import CreateCard from '../components/CreateCard'
import JobLists from '../components/JobLists'
import Modal from '../components/Modal'
import { useState } from 'react'

export default function AdminPage() {
const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }
  const jobData = [
    {
      status: "Active",
      date: "Started on 1 Oct 2025",
      title: "Front End Developer",
      salary: "Rp 7.000.000 - Rp 8.000.000"},
    {
      status: "Inactive",
      date: "Started on 15 Sep 2025",
      title: "Back End Developer",
      salary: "Rp 8.000.000 - Rp 10.000.000"
    }
  ];

  return (
    <div className='flex flex-col gap-4'>
        <Navbar />
        <div className='flex'>
          <div className='flex flex-col w-250'>
            <SearchInput />
            {jobData.length === 0 ? (<HeroSection handleOpenModal={handleOpenModal}/>) : (jobData.map((job) => (
              <JobLists
                status={job.status}
                date={job.date}
                title={job.title}
                salary={job.salary} />
            )))}
          </div>
          <CreateCard handleOpenModal={handleOpenModal} />
          <Modal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    </div>
  )
}
