import { Check } from "lucide-react";
import cardImage from "../../../assets/checkout/checkimg.png";
import CardShape from "../CardShape";

export default function PaymentSuccess() {
  return (
    <section className="my-20 lg:my-30 p-4 lg:p-6 animate-in fade-in duration-700">
      <div className="max-w-310 mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        <div className="w-full md:w-[50%] transform hover:scale-105 transition-transform duration-500 ease-out">
          <CardShape img={cardImage} />
        </div>

        <div className="w-full md:w-[55%] flex justify-center md:justify-end">
          <div className="max-w-127.5 w-full flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                <Check className="w-12 h-12 text-white stroke-[3px]" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Payment Successful!
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Thank you for your trust. Your booking is confirmed.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="group relative w-full h-14 bg-[#1a3a8a] hover:bg-[#152e6d] text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-900/20 active:scale-[0.98] overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
