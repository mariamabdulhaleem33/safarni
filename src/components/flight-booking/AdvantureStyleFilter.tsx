
import { Button } from "@/components/ui/button";

const options = [
  "Advanture Travel",
  "City Breaks",
  "Water Activities",
  "Road Trips",
];

export default function AdvantureStyleFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h2 className="text-xl">Adventure Style</h2>
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
                  ? "bg-blue-200 text-blue-700 rounded-full border-blue-200 cursor-pointer"
                  : "border-blue-300/30 rounded-full hover:bg-gray-100/40 cursor-pointer"
              }`}
            >
              {option}
            </Button>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
