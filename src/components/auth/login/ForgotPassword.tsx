import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <div className="text-right mb-6">
      <Link
        to={"/auth/forgot-password"}
        className="text-xs font-semibold text-gray-700 hover:underline"
      >
        Forgot Password?
      </Link>
    </div>
  )
}
