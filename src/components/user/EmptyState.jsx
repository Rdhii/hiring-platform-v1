export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 text-[#404040] my-5 mx-5 py-36">
        <img src="../../public/Empty State.png" alt="hero section" />
        <div className="flex flex-col items-center "> 
            <p className="text-lg font-medium">No job opening available</p>
            <p>Please wait for the next batch for openings.</p>
        </div>
    </div>
  )
}
