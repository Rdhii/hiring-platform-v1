import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <div className="flex items-center px-4 py-2.5 mx-5 border border-gray-300 rounded-lg justify-between mb-4">
        <input 
        placeholder="Search for jobs..."
        className="">
        </input>
        <Search className="text-[#01959F]"/>
    </div>
  )
}
