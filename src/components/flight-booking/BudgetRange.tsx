import { Slider } from "@/components/ui/slider";
import diagram from "@/assets/diagram.png";

export default function BudgetRange({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (val: [number, number]) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="text-xl mb-2">Budget Range</h2>
      <img
        src={diagram}
        alt="diagram"
      />
      <Slider
        value={value}
        onValueChange={onChange}
        min={0}
        max={1000}
        step={10}
        className="mt-0 w-full [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-track]]:bg-sky-600/30"
      />
      <div className="flex justify-between mt-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Min</span>
          <span className="font-medium tabular-nums text-lg">{value[0]} $</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Max</span>
          <span className="font-medium tabular-nums text-lg">{value[1]} $</span>
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
}
