import profileIcon from "../assets/vecteezy_profile-icon-design-vector_5544718.jpg";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-2 border-b border-gray-200    ">
        <p className=" py-2.5 font-medium text-lg">Job List</p>
        <img src={profileIcon} alt="user avatar" className="size-7 border border-gray-300 rounded-full" />
    </nav>
  )
}
