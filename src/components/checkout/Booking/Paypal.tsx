import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react"; // أيقونات مشابهة للصورة
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { paypalSchema, type PaypalFormData } from "../schemas/paymentSchema";
import ErrorMessage from "../ErrorMessage";
// import { useNavigate } from "react-router-dom";

function Paypal() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaypalFormData>({
    resolver: zodResolver(paypalSchema),
  });

  const onSubmit = async (data: PaypalFormData) => {
    console.log("Submitting Booking Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // navigate("/checkout/success");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-slate-700 font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Full name as shown on ID"
              className={`pl-10 h-12 rounded-none border-slate-200 focus:ring-blue-600 ${
                errors.fullName ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
          </div>
          {errors.fullName && <ErrorMessage msg={errors.fullName.message} />}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-medium">
            Your Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="kneeDue@untitledui.com"
              className={`pl-10 h-12 rounded-none border-slate-200 focus:ring-blue-600 ${
                errors.email ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
          </div>
          {errors.email && <ErrorMessage msg={errors.email.message} />}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1e409f] hover:bg-[#1e3a8a] text-white py-7 rounded-[8px] text-lg font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </Button>
      </form>
    </div>
  );
}
export default Paypal;
