
import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className="relative w-full max-w-3xl">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search car, brand, model..."
        className="
          w-full rounded-xl border
          bg-white py-3 pl-11 pr-4
          text-sm outline-none
          focus:border-blue-500
        "
      />
    </div>
  );
};

export default SearchBox;