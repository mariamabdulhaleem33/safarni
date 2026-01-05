import type { ReactNode } from "react"

interface HeadingProps {
  className?: string
  children: ReactNode
}
import { cn } from "../../lib/utils"
export default function AuthDesc({ className, children }: HeadingProps) {
  return (
    <p
      className={cn(
        "font-poppins font-normal text-[15px] leading-[150%] tracking-normal text-center text-[#4B5563]",
        className
      )}
    >
      {children}
    </p>
  )
}
