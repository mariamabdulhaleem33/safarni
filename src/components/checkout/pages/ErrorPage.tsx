export default function ErrorPage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-5xl font-bold">
        !
      </div>
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="text-gray-500">
        Transaction declined. Please check your card balance.
      </p>
      <div className="flex flex-col w-64 gap-3">
        <button
          onClick={onRetry}
          className="py-3 bg-blue-900 text-white rounded-xl font-bold"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-gray-500 font-medium"
        >
          Home
        </button>
      </div>
    </div>
  );
}
