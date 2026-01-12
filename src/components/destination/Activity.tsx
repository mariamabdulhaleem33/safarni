import { test2 } from "@/assets"

export default function Activity() {
  return (
    <div className="flex flex-col ">
      <div className="mb-3">
        <img src={test2} alt="test" className="rounded-[12px]" />
      </div>
      <h4 className="font-poppins font-normal text-[15px] ">
        Visit the Grand Plaza
      </h4>
      <p className="font font-poppins text-[#4B4F63] text-[12px]">
        The heart of Eldoria, surrounded by historical buildings and lively
        cafes.
      </p>
    </div>
  )
}
