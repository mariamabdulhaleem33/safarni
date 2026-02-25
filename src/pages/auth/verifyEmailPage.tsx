import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const emailLink = window.location.href; 
    const email = window.localStorage.getItem("emailForSignIn");

    if (!email) {
      toast.error("Email not found, please try logging in again");
      navigate("/auth/login");
      return;
    }

    if (isSignInWithEmailLink(auth, emailLink)) {
      signInWithEmailLink(auth, email, emailLink)
        .then(async (result) => {
          // Get ID token
          const token = await result.user.getIdToken();
          localStorage.setItem("authToken", token);
          localStorage.setItem("userData", JSON.stringify(result.user));
          toast.success("Email verified and logged in!");
          navigate("/"); 
        })
        .catch((err) => {
          console.error(err);
          toast.error("Verification failed");
          navigate("/auth/login");
        });
    }
  }, [searchParams, navigate, auth]);

  return <p>Verifying your email...</p>;
}