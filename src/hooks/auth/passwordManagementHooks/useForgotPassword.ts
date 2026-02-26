import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "sonner";

interface ForgotPasswordData {
  email: string;
}

export const useForgotPassword = () => {
  return useMutation<void, Error, ForgotPasswordData>({
    mutationFn: async ({ email }) => {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/auth/reset-password`,
        handleCodeInApp: true,
      });
      console.log(`${window.location.origin}/auth/reset-password`);
    },
    onSuccess: () => {
      toast.success("Reset password link sent to your email");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reset link");
    },
  });
};
