export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-5xl text-green-600">✓</span>
      </div>
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p className="text-gray-500">
        Your booking has been confirmed. Check your email.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-8 py-3 bg-blue-900 text-white rounded-xl font-bold"
      >
        Back to Home
      </button>
    </div>
  );
}
