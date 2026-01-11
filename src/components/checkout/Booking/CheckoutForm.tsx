import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
const CheckoutForm = ({
  clientSecret,
  paymentId,
}: {
  clientSecret: string;
  paymentId: string | undefined;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    setIsProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card },
        }
      );
      if (error) {
        toast.error(error.message || "Payment failed, please try again", {
          duration: 3000,
        });
        setTimeout(() => {
          setIsProcessing(false);
          window.location.href = `/payment/error/${paymentId}`;
        }, 3000);
        return;
      }
      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/payment/success";
        }, 1500);
      }
    } catch {
      toast.error("An unexpected error occurred");
      setIsProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-xl bg-white shadow-sm">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button
        disabled={isProcessing || !stripe}
        className="w-full bg-[#1a3a8a] text-white py-3 rounded-xl font-bold disabled:bg-slate-300 cursor-pointer"
      >
        {isProcessing ? "processing..." : "pay now"}
      </button>
    </form>
  );
};
export default CheckoutForm;
