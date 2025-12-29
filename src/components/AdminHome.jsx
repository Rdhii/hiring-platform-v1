import HeroSection from './HeroSection';
import JobLists from './JobLists';

export default function AdminHome() {
    const jobData = [];
    return (
        <div>
            {jobData.length === 0 ? <HeroSection /> : <JobLists />}
        </div>
  )
}
