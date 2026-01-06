import TourCardsGrid from "@/components/compare/TourCardsGrid"
import TourOptionsPanel from "@/components/compare/TourOptionsPanel"

export default function CompareToursPage() {
  return (
    <div className="section-container pt-[110px] mt-7 mb-[80px]">
      <TourCardsGrid />
      <h2 className="text-gray-900 mt-[32px] mb-[16px] text-[22px] ">
        Compare
      </h2>
      <TourOptionsPanel />
    </div>
  )
}
