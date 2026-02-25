import { useMutation } from "@tanstack/react-query";
import { auth } from "@/firebase/firebase";
import { signInWithEmailLink } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface OTPFormValues {
  otp: string;
  email: string;
}

export const useOTPVerify = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, OTPFormValues>({
    mutationFn: async ({ email}) => {
      if (!signInWithEmailLink(auth, window.location.href)) {
        throw new Error("Invalid verification link");
      }
      await signInWithEmailLink(auth, email, window.location.href);
    },

    onSuccess: () => {
      toast.success("OTP Verified Successfully");
      navigate("/auth/verify-email");
    },

    onError: (error: any) => {
      toast.error(error.message || "OTP verification failed");
    },
  });
};
