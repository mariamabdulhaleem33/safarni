import type { ReactNode } from "react"
import { FaCheck } from "react-icons/fa"
type RuleProps = {
  children: ReactNode
  isPasswordError: boolean
}
export default function Rule({ children, isPasswordError }: RuleProps) {
  return (
    <div className="font-poppins font-normal text-[18px] leading-[140%] tracking-normal capitalize flex items-center gap-2">
      <span
        className={` h-3.5 w-3.5 rounded-full ${
          isPasswordError ? " bg-red-500" : ""
        } bg-[#9CA3AF] text-white flex items-center justify-center`}
      >
        <FaCheck size={8} />
      </span>
      <p
        className={`font-poppins font-normal text-[14px]${
          isPasswordError ? " text-red-500" : ""
        } "text-[#6B7280]" leading-[140%] tracking-normal capitalize`}
      >
        {children}
      </p>
    </div>
  )
}
