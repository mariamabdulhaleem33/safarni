import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import AuthButton from "../auth/AuthButton"

export default function TourOptionSelector({ placeOptions }: any) {
  const [selectedValue, setSelectedValue] = useState<string>("")

  return (
    <div className="w-full">
      <RadioGroup
        // defaultValue="1"
        onValueChange={setSelectedValue}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {placeOptions.map((option: any) => (
          <div key={option.id}>
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={option.id}
              className="flex flex-col h-full items-start p-[24px] bg-[#FAFAFA] border rounded-[12px] cursor-pointer transition-all duration-200
                         peer-data-[state=checked]:border-[#1C64F2] peer-data-[state=checked]:bg-blue-50/50
                         hover:bg-slate-50 border-slate-200 dark:border-slate-800 dark:peer-data-[state=checked]:bg-blue-900/20"
            >
              <span className="font-semibold text-sm md:text-base text-slate-900">
                {option.name}
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">
                  ${option.price}
                </span>
                <span className="text-sm text-muted-foreground">/person</span>
              </div>

              <ul className="mt-2 space-y-1 text-xs md:text-sm text-muted-foreground">
                <li>✓ Duration: {option.duration}</li>
                <li>✓ Highlights: {option.highlights}</li>
                <li>✓ Availability: {option.availability}</li>
                <li>✓ Guide: {option.guide}</li>
                <li>✓ Transportation: {option.transportation}</li>
              </ul>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <AuthButton
        className="bg-[#1E429F] disabled:bg-gray-500 max-w-[608px] block mt-[48px] mx-auto"
        disabled={!selectedValue}
      >
        {selectedValue ? "Check Out" : "Choose An Option"}
      </AuthButton>
    </div>
  )
}
