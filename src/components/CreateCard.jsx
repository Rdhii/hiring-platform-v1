


export default function CreateCard({ handleOpenModal }) {

  return (
    <div className="flex flex-col items-center bg-[url('/create-job-card.png')] bg-cover h-fit p-6 rounded-2xl text-white gap-6">
        <div >
            <p className="mb-1">Recruit the best candidates </p>
            <p className="text-sm">Create jobs, invite, and hire with ease</p>
        </div>
        <button onClick={handleOpenModal} className="px-16 py-1.5 rounded-lg bg-[#01959F] text-base hover:bg-[#017A82]">Create a new job</button>
    </div>
  )
}
