import { Link } from "react-router-dom"

type AuthRedirect = {
  variant: "signup" | "signin"
}

const VARIANTS = {
  signup: {
    text: "Don't have an account?",
    linkText: "Sign Up",
    path: "/signup",
  },
  signin: {
    text: "Already have an account?",
    linkText: "Sign In",
    path: "/login",
  },
}
export default function AuthRedirect({ variant }: AuthRedirect) {
  const config = VARIANTS[variant]
  return (
    <div className="text-center mt-8">
      <p className="text-sm text-gray-700 font-medium">
        {config.text}{" "}
        <Link
          to={config.path}
          className="text-[#2D3A8C] font-bold hover:underline"
        >
          {config.linkText}
        </Link>
      </p>
    </div>
  )
}
