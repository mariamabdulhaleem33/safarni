import type { ReactNode } from "react"
import { FaCheck } from "react-icons/fa"
type RuleProps = {
  children: ReactNode
  passwordValue?: string
  isPasswordError: boolean
}
export default function Rule({
  children,
  isPasswordError,
  passwordValue,
}: RuleProps) {
  let status: "idle" | "valid" | "invalid" = "idle"

  if (passwordValue && passwordValue.length > 0) {
    if (isPasswordError) {
      status = "invalid"
    } else {
      status = "valid"
    }
  }

  const bgColors = {
    idle: "bg-[#9CA3AF]",
    valid: "bg-green-500",
    invalid: "bg-red-500",
  }

  const textColors = {
    idle: "text-[#6B7280]",
    valid: "text-green-500",
    invalid: "text-red-500",
  }
  return (
    <div className="font-poppins font-normal text-[14px] leading-[140%] tracking-normal capitalize flex items-center gap-2">
      <span
        className={`h-3.5 w-3.5 rounded-full ${bgColors[status]} text-white flex items-center justify-center transition-colors duration-200`}
      >
        <FaCheck size={8} />
      </span>
      <p
        className={`font-poppins font-normal ${textColors[status]} leading-[140%] tracking-normal capitalize transition-colors duration-200`}
      >
        {children}
      </p>
    </div>
  )
}
