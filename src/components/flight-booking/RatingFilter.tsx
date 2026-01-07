
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const options = ["1", "2", "3", "4", "5"];

export default function RatingFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl">Rating</h2>
      <div className="flex gap-5 flex-wrap">
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <Button
              key={option}
              onClick={() =>
                onChange(
                  isSelected
                    ? selected.filter(o => o !== option)
                    : [...selected, option],
                )
              }
              variant={isSelected ? "filterActive" : "outline"}
              className={`${
                isSelected
                  ? "!py-8 !px-10 bg-blue-200 text-blue-700 rounded-full border-blue-200 cursor-pointer flex items-center gap-1"
                  : "!py-8 !px-10 border-blue-300/30 rounded-full hover:bg-gray-100/40 cursor-pointer flex items-center gap-1"
              }`}
            >
              <Star size={16} />
              {option}
            </Button>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
