import Navbar from '../components/Navbar'
import SearchInput from '../components/SearchInput'
import HeroSection from '../components/HeroSection'
import CreateCard from '../components/CreateCard'
import JobLists from '../components/JobLists'
import AdminHome from '../components/AdminHome'
import Modal from '../components/Modal'
import { useState } from 'react'

export default function AdminPage() {
const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }
  const jobData = [];

  return (
    <div className='flex flex-col gap-4'>
        <Navbar />
        <div className='flex'>
          <div className='flex flex-col w-250'>
            <SearchInput />
            {jobData.length === 0 ? <HeroSection handleOpenModal={handleOpenModal}/> : <JobLists />}
          </div>
          <CreateCard handleOpenModal={handleOpenModal} />
          <Modal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    </div>
  )
}
