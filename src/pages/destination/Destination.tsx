import { test2 } from "@/assets"
import TripInfo from "@/components/destination/TripInfo"
import TopActivities from "../../components/destination/TopActivities"
import BestTimeToVisit from "../../components/destination/BestTimeToVisit"
import Gallery from "@/components/destination/Gallery"
import Reviews from "@/components/destination/Reviews"
import DestinationBooking from "@/components/destination/DestinationBooking"
import { SlArrowLeft } from "react-icons/sl"
import DestinationSkeleton from "@/components/destination/DestinationSkeleton"
import { useEffect, useState } from "react"

export default function Destination() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <DestinationSkeleton />
  return (
    <div>
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6 md:px-8 lg:px-0 min-h-[2000.94px] pt-20 sm:pt-22 md:pt-24 lg:pt-41.5 pb-6 sm:pb-8 md:pb-10 ">
        {/* Back Button  */}
        <div className="mb-5">
          <div className="w-11 h-11 rounded-full bg-[#F3F4F6] hover:cursor-pointer flex justify-center items-center text-3 font-200 text-[#0D0D0D]">
            <button onClick={() => window.history.back()}>
              <SlArrowLeft />
            </button>
          </div>
        </div>
        {/* destination image */}
        <div className="w-full">
          <img
            src={test2}
            alt="trip"
            className="rounded-xl w-full max-h-138.75"
          />
        </div>
        {/* Sections */}
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
      <div className="w-full bg-white shadow-[30px_0px_59px_0px_#e2e8f0] rounded-t-3xl">
        <DestinationBooking />
      </div>
    </div>
  )
}
