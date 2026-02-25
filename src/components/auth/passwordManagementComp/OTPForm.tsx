
import { useState, type FC } from "react"
import { Button } from "../../ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { auth } from "@/firebase/firebase"
import { sendEmailVerification } from "firebase/auth"
import { useNavigate } from "react-router-dom"

type Props = {
  email: string
}

const OTPForm: FC<Props> = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const checkVerification = async () => {
    setLoading(true)
    try {
      if (!auth.currentUser) throw new Error("User not found")

      await auth.currentUser.reload()

      if (auth.currentUser.emailVerified) {
        toast.success("Email verified successfully")
        navigate("/auth/login")
      } else {
        toast.error("Email not verified yet")
      }
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const resendEmail = async () => {
    if (!auth.currentUser) return
    setResending(true)
    try {
      await sendEmailVerification(auth.currentUser)
      toast.success("Verification email resent")
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex items-center flex-col gap-4 w-full">
      <Button className="w-[90%] bg-blue-800" onClick={checkVerification} disabled={loading}>
        {loading ? (
          <>
            Checking <Loader2 className="animate-spin" />
          </>
        ) : (
          "I have verified my email"
        )}
      </Button>

      <button
        onClick={resendEmail}
        disabled={resending}
        className="underline text-blue-800"
      >
        {resending ? "Resending..." : "Resend email"}
      </button>
    </div>
  )
}

export default OTPForm