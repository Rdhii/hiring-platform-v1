import Navbar from '../components/Navbar'
import SearchInput from '../components/SearchInput'
import HeroSection from '../components/HeroSection'
import CreateCard from '../components/CreateCard'

export default function AdminPage() {
  return (
    <div className='flex flex-col gap-4'>
        <Navbar />
        <div className='flex'>
          <div className='flex flex-col w-250'>
            <SearchInput />
            <HeroSection />
          </div>
          <CreateCard />
        </div>
    </div>
  )
}
