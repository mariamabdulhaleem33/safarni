export default function TripInfoSkeleton() {
  const FLEX_LAYOUT = "flex justify-between items-center animate-pulse"

  return (
    <article className="flex flex-col gap-7 w-full">
      <div className={FLEX_LAYOUT}>
        <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded-md w-24"></div>
      </div>

      <div className={FLEX_LAYOUT}>
        <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
        <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
      </div>
    </article>
  )
}
