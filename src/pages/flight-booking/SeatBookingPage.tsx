import SeatBooking from "@/components/flight-booking/SeatBooking"
import Plane from "@/assets/plane.png"
export default function SeatBookingPage() {
  return (
    <div className="flex w-full justify-center p-4 flex-column gap-30">
      <div className="hidden md:flex">
        <img
          src={Plane}
          alt="plane"
        />
      </div>

      <div className="pt-30">
        <SeatBooking />
      </div>
    </div>
  )
}
