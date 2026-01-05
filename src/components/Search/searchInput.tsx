import { IoSearchOutline } from 'react-icons/io5'
export default function SearchInput() {
  return (
    <div className="w-full mx-auto p-4">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <IoSearchOutline size={20} />
        </div>
        <input
          type="text"
          placeholder="Search destinations, experiences, and more"
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-blue-300 focus:border-blue-400 focus:outline-none text-gray-700 bg-white shadow-sm"
        />
      </div>
    </div>
  )
}
