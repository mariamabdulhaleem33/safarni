import type { AuthPageTemplateProps } from "@/types/auth-types"

const AuthPageTemplate = ({ image, children }: AuthPageTemplateProps) => {
  return (
    <div className="flex items-center justify-center sm:gap-20 gap-5 text-center">
      <div className="w-120 hidden lg:block">
        <img src={image} alt="welcome" />
      </div>
      <div className="flex flex-col w-107.5 gap-5 px-5">{children}</div>
    </div>
  )
}
export default AuthPageTemplate
