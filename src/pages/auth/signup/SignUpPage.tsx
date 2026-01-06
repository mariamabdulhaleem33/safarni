import SignUpForm from "@/components/auth/signUp/SignUpForm"
import AuthPageTemplate from "../AuthPageTemplate"
import { signup } from "@/assets"
import AuthHeader from "@/components/auth/AuthHeader"
import WelcomeAgain from "@/components/auth/WelcomeAgain"

export default function SignUpPage() {
  return (
    <div className="h-screen relative flex flex-col justify-center lg:justify-start gap-25">
      <div className="hidden lg:block">
        <AuthHeader variant="login" />
      </div>

      <main>
        <AuthPageTemplate image={signup}>
          <WelcomeAgain />
          <SignUpForm />
        </AuthPageTemplate>
      </main>
    </div>
  )
}
