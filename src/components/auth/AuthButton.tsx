import type { ReactNode } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
type AuthButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}
export default function AuthButton({
  children,
  onClick,
  className,
}: AuthButtonProps) {
  return (
    <Button className={cn("auth-button", className)} onClick={onClick}>
      {children}
    </Button>
  )
}
