import type { ReactNode } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
type AuthButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}
export default function AuthButton({
  children,
  onClick,
  className,
  disabled,
}: AuthButtonProps) {
  return (
    <Button
      className={cn("auth-button", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
