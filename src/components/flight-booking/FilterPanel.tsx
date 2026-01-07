

import { useState } from "react";
import BudgetRange from "@/components/flight-booking/BudgetRange";
import SortBy from "./SortBy";
import AdvantureStyleFilter from "@/components/flight-booking/AdvantureStyleFilter";
import RatingFilter from "@/components/flight-booking/RatingFilter";
import { Button } from "@/components/ui/button";

export default function FilterPanel() {
 
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [budget, setBudget] = useState<[number, number]>([200, 800]);
  const [adventureStyles, setAdventureStyles] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);

  const resetAll = () => {
    setSortBy(null);
    setBudget([200, 800]);
    setAdventureStyles([]);
    setRatings([]);
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full max-w-6xl px-6 mx-auto">
        <SortBy
          selected={sortBy}
          onChange={setSortBy}
        />
        <BudgetRange
          value={budget}
          onChange={setBudget}
        />
        <AdvantureStyleFilter
          selected={adventureStyles}
          onChange={setAdventureStyles}
        />
        <RatingFilter
          selected={ratings}
          onChange={setRatings}
        />
        <div className="flex justify-center mt-5 w-full">
          <Button
            onClick={resetAll}
            variant="outline"
            className="mt-4 cursor-pointer border-blue-600 text-blue-600 w-50"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
