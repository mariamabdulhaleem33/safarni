import { FaApple, FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

export default function AuthSocialButtons() {
  const ProviderButton =
    "flex items-center justify-center py-2 border border-[#0069AB] rounded-[6px] hover:bg-gray-50 transition-all hover:cursor-pointer min-h-12"
  return (
    <div className="grid grid-cols-3 gap-3">
      <button className={ProviderButton}>
        <FcGoogle size={24} />
      </button>
      <button className={ProviderButton}>
        <FaFacebook className="text-[#1877F2]" size={24} />
      </button>
      <button className={ProviderButton}>
        <FaApple size={24} className="text-black" />
      </button>
    </div>
  )
}
