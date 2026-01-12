import { hero } from "@/assets"
import StarRating from "./StarRating"

export default function Review() {
  return (
    <div className="border border-[#9CA3AF] p-3 rounded-[12px]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl overflow-hidden ">
            <img src={hero} alt="hero" />
          </div>
          <span>Dale Thiel</span>
        </div>
        <span className="font-poppins text-[#4B5563] text-[15px] font-medium ">
          11 moths ago
        </span>
      </div>
      <StarRating rating={4.5} variant={"reviewCard"} />
      <p className="max-w-[70%] text-[#2C2C2C] font-poppins text-5 mt-2">
        {" "}
        I really enjoyed my stay—the room was clean, the staff were friendly,
        and everything I needed was nearby.
      </p>
    </div>
  )
}
