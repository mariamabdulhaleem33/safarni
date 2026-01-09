import { test2 } from "@/assets"
import TripInfo from "@/components/destination/TripInfo"
import TopActivities from "../../components/destination/TopActivities"
import BestTimeToVisit from "../../components/destination/BestTimeToVisit"
import Gallery from "@/components/destination/Gallery"
import Reviews from "@/components/destination/Reviews"
import DestinationBooking from "@/components/destination/DestinationBooking"
import { SlArrowLeft } from "react-icons/sl"

export default function Destination() {
  return (
    <div>
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0 min-h-[2000.94px] pt-20 sm:pt-22 md:pt-24 lg:pt-41.5 pb-6 sm:pb-8 md:pb-10 ">
        <div className="mb-5">
          {/* Back Button  */}
          <div className="w-11 h-11 rounded-full bg-[#F3F4F6] hover:cursor-pointer flex justify-center items-center text-3 font-200 text-[#0D0D0D]">
            <button onClick={() => window.history.back()}>
              <SlArrowLeft />
            </button>
          </div>
        </div>
        <div>
          <img src={test2} alt="trip" className="rounded-xl" />
        </div>
        <div className="mt-5">
          <TripInfo />
        </div>
        <div className="mt-11">
          <TopActivities />
        </div>
        <div className="mt-11">
          <BestTimeToVisit />
        </div>
        <div className="mt-11">
          <Gallery />
        </div>
        <div className="mt-11">
          <Reviews />
        </div>
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-white shadow-[10px_0px_39px_0px_#e2e8f0] rounded-t-3xl">
        <DestinationBooking />
      </div>
    </div>
  )
}
