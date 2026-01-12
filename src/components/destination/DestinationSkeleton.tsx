import TripInfoSkeleton from "./TripInfoSkeleton"

export default function DestinationSkeleton() {
  return (
    <div className="w-full max-w-310 mx-auto pt-20 sm:pt-22 md:pt-24 lg:pt-41.5 pb-6 sm:pb-8 md:pb-10">
      <div className="mb-5">
        <div className="w-11 h-11 rounded-full bg-gray-100"></div>
      </div>

      <div className="w-full aspect-video md:aspect-21/9 bg-gray-200 rounded-xl animate-pulse mb-5"></div>

      <div className="mt-5">
        <TripInfoSkeleton />
      </div>

      <div className="mt-11 flex gap-5 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="min-w-70 h-40 bg-gray-100 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  )
}
