import { ArrowRight } from "lucide-react";
import profileIcon from "../assets/vecteezy_profile-icon-design-vector_5544718.jpg";
import { Link } from "react-router-dom";

export default function NavbarManage() {
  return (
    <nav className="flex items-center justify-between px-5 py-4  border-b border-gray-200">
        <div className="flex items-center font-medium text-sm gap-2">
            <Link to="/" className=" py-1 px-4 rounded-lg border border-gray-300 shadow-sm">Job List</Link>
            <ArrowRight />
            <p className="py-1 px-4 rounded-lg border border-gray-300  bg-[#EDEDED]"    >Manage Candidate</p>
        </div>
        <img src={profileIcon} alt="user avatar" className="size-7 border border-gray-300 rounded-full" />
    </nav>
  )
}
