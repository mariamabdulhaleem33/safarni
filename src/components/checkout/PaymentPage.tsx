import CardShape from "./CardShape";
import cardImage from "../../assets/checkout/card_image.png";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { MethodSelector } from "./MethodSelector";
import Visa from "./Booking/visa";
import Mastercard from "./Booking/Mastercard";
import Paypal from "./Booking/Paypal";
import BackIcon from "./BackIcon";

export default function PaymentPage() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const handleContinue = () => {
    if (!selectedValue) {
      toast.error("Please select a payment method", {
        position: "top-center",
      });
      return;
    }
    setIsConfirmed(true);
  };
  return (
    <section className="mt-30 mb-10">
      <div className="max-w-310 mx-auto p-6">
        <BackIcon url="#" />
        <div className="grid md:grid-cols-2 gap-8">
          <CardShape img={cardImage} />
          <div
            className={`h-145 w-full flex flex-col ${
              isConfirmed ? "justify-start" : "justify-between"
            } gap-8 w-full py-2 px-3 md:px-10 font-sans`}
          >
            {/* Select Payment Method */}
            <MethodSelector
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
            {/* Global checkout action button  */}
            {!isConfirmed && (
              <div className="flex flex-col items-center gap-6 mt-8">
                <button className="flex items-center gap-2 text-sm font-medium text-[#111928] hover:text-blue-700 transition-colors">
                  <span className="text-[22px]">Add Card</span>
                  <PlusCircle size={20} />
                </button>
                {/* Global checkout action button  */}
                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#1940a4] hover:bg-[#173787] text-white py-6 rounded-[8px] text-lg font-bold cursor-pointer"
                >
                  Continue
                </Button>
              </div>
            )}
            {/* Payment Method Form */}
            {isConfirmed && (
              <div className="animate-in slide-in-from-top-4 duration-500">
                {isConfirmed && selectedValue === "visa" && <Visa />}
                {isConfirmed && selectedValue === "mastercard" && (
                  <Mastercard />
                )}
                {isConfirmed && selectedValue === "paypal" && <Paypal />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
