import { Link } from "react-router-dom";

export default function JobLists(props) {
  return (
    <div className="flex flex-col m-5 shadow-xl rounded-2xl">
        <div className="flex items-center gap-4 mx-6 mt-6 mb-3 text-sm">
            <p className="border px-4 py-1 text-[#43936C] font-medium rounded-lg bg-[#F8FBF9] border-[#B8DBCA]">{props.status}</p>
            <p className="border px-4 py-1 border-[#E0E0E0] rounded-sm">{props.date}</p>
        </div>
        <div className=" mx-6 mb-6 flex flex-col gap-2">
            <p className="font-medium">{props.title}</p>
            <div className="flex justify-between">
                <p className="text-[#616161]">{props.salary}</p>
                <Link to="/" className="flex items-end bg-[#01959F] text-white px-4 py-1 text-sm rounded-lg hover:bg-[#017A82]">Manage Job</Link>
            </div>
        </div>
    </div>
  )
}
