import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface HeadingProps {
  className?: string
  children: ReactNode
}
export default function AuthHeading({ className, children }: HeadingProps) {
  return (
    <h1
      className={cn(
        "font-poppins font-medium text-[28px] leading-[100%] tracking-normal text-center text-[#111928]",
        className
      )}
    >
      {children}
    </h1>
  )
}
