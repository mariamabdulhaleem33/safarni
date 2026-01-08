

import { Button } from "@/components/ui/button";

const sortingOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Biggest Deals(Highest Saving)",
  "Most Reviewed",
  "Most Popular",
];

export default function SortBy({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex flex-col mb-6 gap-4">
      <h2 className="text-xl">Sort By</h2>
      <div className="flex gap-5 flex-wrap">
        {sortingOptions.map(option => (
          <Button
            key={option}
            onClick={() => onChange(selected === option ? null : option)}
            variant={selected === option ? "filterActive" : "outline"}
            className={`${
              selected === option
                ? "bg-blue-200 text-blue-700 rounded-full border-blue-200 cursor-pointer"
                : "py-2 px-4 border-blue-300/30 rounded-full cursor-pointer hover:bg-gray-100/40"
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
      <hr />
    </div>
  );
}
