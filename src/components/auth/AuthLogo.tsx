import { logo } from "@/assets"
import { cn } from "@/lib/utils"
type AuthLogo = {
  className?: string
}
export default function AuthLogo({ className }: AuthLogo) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className={cn("w-12.5", className)}>
        <img className="w-full" src={logo} alt="logo" />
      </div>
      <span className="font-poppins font-semibold text-[25px] leading-[100%] tracking-normal text-center text-[#1E429F]">
        Safarni
      </span>
    </div>
  )
}
