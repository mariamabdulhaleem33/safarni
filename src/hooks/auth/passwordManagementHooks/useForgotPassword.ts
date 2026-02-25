import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { auth } from "@/firebase/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

interface ResendProps {
  email: string;
}

const actionCodeSettings = {
  url: window.location.origin + "/auth/reset-password",
  handleCodeInApp: true,
};

export const useForgotPassword = () => {
  return useMutation<void, Error, ResendProps>({
    mutationFn: async ({ email }) => {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
    },
    onSuccess: () => {
      toast.success("Reset password link sent to your email!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reset link");
    },
  });
};