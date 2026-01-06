export default function BackButton() {
  return (
    <button
      className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 active:bg-gray-100 shadow-sm flex items-center justify-center transition-colors border border-gray-200"
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-700"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  )
}
