import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  mastercardSchema,
  type MasterCardData,
} from "../schemas/paymentSchema";
import { Calendar, Mail, User } from "lucide-react";
import ErrorMessage from "../ErrorMessage";
// import { useNavigate } from "react-router-dom";

function Mastercard() {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MasterCardData>({
    resolver: zodResolver(mastercardSchema),
  });

  const onSubmit = async (data: MasterCardData) => {
    console.log("Payment Confirmed:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // navigate("/checkout/success");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-slate-600">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            {...register("fullName")}
            placeholder="Full name as shown on ID"
            className="h-12 pl-10 rounded-none border-slate-200 focus:ring-blue-600"
          />
        </div>
        {errors.fullName && <ErrorMessage msg={errors.fullName.message} />}
      </div>
      <div className="space-y-2">
        <Label className="text-slate-600">Your Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            {...register("email")}
            type="email"
            placeholder="kneeDue@untitledui.com"
            className="h-12 pl-10 rounded-none border-slate-200 focus:ring-blue-600"
          />
        </div>
        {errors.email && <ErrorMessage msg={errors.email.message} />}
      </div>

      <div className="flex justify-between gap-6 pt-2">
        <div className="space-y-2">
          <Label>Valid Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              {...register("validDate")}
              placeholder="18/1/2025"
              className="pl-10 h-12 rounded-none"
            />
          </div>

          {errors.validDate && <ErrorMessage msg={errors.validDate.message} />}
        </div>
        <div className="space-y-2">
          <Label className="text-slate-600">CVV</Label>
          <Controller
            control={control}
            name="cvv"
            render={({ field }) => (
              <InputOTP
                maxLength={3}
                value={field.value}
                onChange={field.onChange}
                className="h-12 rounded-none border-slate-200 focus:ring-blue-600"
              >
                <InputOTPGroup className="gap-2 rounded-none">
                  <InputOTPSlot
                    index={0}
                    className="rounded-none border h-12 w-10 text-center"
                  />
                  <InputOTPSlot
                    index={1}
                    className="rounded-none border h-12 w-10 text-center"
                  />
                  <InputOTPSlot
                    index={2}
                    className="rounded-none border h-12 w-10 text-center"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.cvv && <ErrorMessage msg={errors.cvv.message} />}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1e409f] hover:bg-[#1e3a8a] text-white py-7 rounded-[8px] text-lg font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
export default Mastercard;
