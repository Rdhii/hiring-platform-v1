import { Link } from "react-router-dom";


export default function HeroSection( {handleOpenModal} ) {
  return (
    <div className="flex flex-col items-center gap-4 text-[#404040] my-5 mx-5 py-36">
        <img src="../../public/Empty State.png" alt="hero section" />
        <div className="flex flex-col items-center "> 
            <p className="text-lg font-medium">No job opening available</p>
            <p>Create a job now opening now and the start the candidates process.</p>
        </div>
        <button onClick={handleOpenModal} className="bg-[#FBC037] py-1.5 px-4 rounded-lg font-medium hover:bg-amber-500">Create a new job</button>
    </div>
  )
}
