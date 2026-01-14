import Navbar from '../components/admin/Navbar'
import SearchInput from '../components/admin/SearchInput'
import HeroSection from '../components/admin/HeroSection'
import CreateCard from '../components/admin/CreateCard'
import JobLists from '../components/admin/JobLists'
import Modal from '../components/admin/Modal'
import { useState } from 'react'

export default function AdminPage() {
const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className='flex flex-col gap-4'>
        <Navbar />
        <div className='flex'>
          <div className='flex flex-col w-250'>
            <SearchInput />
            <JobLists />
          </div>
          <CreateCard handleOpenModal={handleOpenModal} />
          <Modal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    </div>
  )
}
