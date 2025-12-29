import Navbar from '../components/Navbar'
import SearchInput from '../components/SearchInput'
import HeroSection from '../components/HeroSection'
import CreateCard from '../components/CreateCard'
import JobLists from '../components/JobLists'

export default function AdminPage() {
  return (
    <div className='flex flex-col gap-4'>
        <Navbar />
        <div className='flex'>
          <div className='flex flex-col w-250'>
            <SearchInput />
            <div className>
            <JobLists />
            <JobLists />
            </div>
          </div>
          <CreateCard />
        </div>
    </div>
  )
}
