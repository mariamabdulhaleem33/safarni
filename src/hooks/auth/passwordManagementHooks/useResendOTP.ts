import { useMutation } from "@tanstack/react-query";
import { auth } from "@/firebase/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "sonner";

interface ResendProps {
  email: string;
}

const actionCodeSettings = {
  url: `${window.location.origin}/auth/verify-email`, 
  handleCodeInApp: true,
};

export const useResendOTP = () => {
  return useMutation<void, Error, ResendProps>({
    mutationFn: async ({ email }) => {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
    },
    onSuccess: () => {
      toast.success("OTP sent to your email!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });
};