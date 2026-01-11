import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

function StripeForm({ bookingId }: { bookingId: string | undefined }) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.post(
          `https://round8-safarni-team-three.huma-volve.com/api/create-payment-intent/${bookingId}`,
          { booking_id: bookingId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                localStorage.getItem("authToken") || ""
              }`,
            },
          }
        );
        const json = response.data;
        if (json.status === "success" && json.data.length > 0) {
          const paymentData = json.data[0];
          setStripePromise(loadStripe(paymentData.publishable_key));
          setClientSecret(paymentData.client_secret);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const serverMessage = err.response?.data?.message;
          const status = err.response?.status;
          toast.error(serverMessage || `Server Error: ${status}`);
          console.error("Server Error Details:", err.response?.data);
        } else {
          toast.error("An unexpected error occurred or connection failed");
          console.error("Generic Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchPaymentData();
  }, [bookingId]);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!stripePromise || !clientSecret)
    return (
      <p className="text-center text-red-500">Failed to load payment data</p>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-2xl border">
      <h3 className="text-lg font-bold mb-4 text-slate-800">
        Enter your payment details
      </h3>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} paymentId={bookingId} />
      </Elements>
    </div>
  );
}
export default StripeForm;
