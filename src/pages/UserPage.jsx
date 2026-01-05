import Navbar from '../components/user/Navbar'
import EmptyState from '../components/user/EmptyState'
import JobItem from '../components/user/JobItem'
import JobDetail from '../components/user/JobDetail'

export default function UserPage() {

  const jobItems = [
    {
      title: "UX Designer",
      company: "Rakamin",
      location: "Jakarta Selatan",
      salary: "Rp7.000.000 - Rp15.000.000"
    },

    {
      title: "UI Designer",
      company: "Rakamin",
      location: "Jakarta Selatan",
      salary: "Rp5.000.000 - Rp15.000.000" 
    }
  ]

  return (
    <>
        <Navbar />
        <div className='flex gap-6'>
          <div className='mt-10 space-y-4'>
            {jobItems.map((job) => (
              <JobItem
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary} />
            ))}
          </div>
          <JobDetail />
        </div>
    </>
  )
}
