import { XCircle, RefreshCw } from "lucide-react";
import { useParams } from "react-router-dom";

function ErrorPage() {
  const { paymentId } = useParams();
  return (
    <section className="my-30 p-4 lg:p-6 animate-in slide-in-from-bottom-10 duration-700 overflow-hidden">
      <div className="w-full md:max-w-150 mx-auto text-center space-y-8 p-5 md:p-10 bg-white rounded-3xl shadow-2xl border border-red-50">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-red-100 rounded-full scale-150 blur-2xl opacity-30"></div>
          <div className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <XCircle className="w-14 h-14 text-white stroke-[2.5px]" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Payment Failed!
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            We couldn't process your transaction. This might be due to incorrect
            card details or insufficient funds.
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
          <p className="text-sm text-red-600 font-semibold">
            Error Code: <span className="font-mono">DECLINED_BY_BANK</span>
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={() => (window.location.href = `/payment/${paymentId}`)}
            className="w-fit flex items-center justify-center gap-2 cursor-pointer bg-[#1a3a8a] hover:bg-[#152e6d] text-white py-4 px-8 rounded-2xl font-bold transition-all hover:shadow-lg active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="text-slate-400 hover:text-slate-600 text-sm font-medium underline underline-offset-4 cursor-pointer"
        >
          Cancel and return to Home
        </button>
      </div>
    </section>
  );
}
export default ErrorPage;
