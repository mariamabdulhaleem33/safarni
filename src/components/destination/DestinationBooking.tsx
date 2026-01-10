import { Button } from "../ui/button"

export default function DestinationBooking() {
  return (
    <div className="md:min-h-30 min-h-20 p-4 flex justify-center items-center">
      <div className="w-full max-w-310 mx-auto px-4 sm:px-6 md:px-8 lg:px-0 rounded-tl-2xl flex justify-between items-center">
        <p className="text-[25px]">
          Total price:{" "}
          <span className="md:text-[30px] text-5 text-[#1E429F] font-medium">
            $150.00
          </span>{" "}
          <span className="text-[13px]">/night</span>
        </p>
        <Button className="bg-[#1E429F] min-h-11 w-[50%] hover:cursor-pointer hover:bg-[#112f7a]">
          Book Now
        </Button>
      </div>
    </div>
  )
}
