export default function TourCard({ place }: any) {
  return (
    <div className="rounded-[24px] p-4 bg-[#FAFAFA] flex flex-1 flex-col lg:flex-row items-center text-center lg:text-left gap-4 shadow-[0px_4px_25px_0px_#D1D5DB8F]">
      <div className="min-w-[130px] h-[130px] rounded-[8px] overflow-hidden ">
        <img
          className="w-full h-full object-cover aspect-square"
          src={place.image}
          alt={place.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="capitalize text-[18px] font-medium text-[#0F1417]">
          {place.name}
        </h3>
        <p className="text-[#6B7280]">
          <span>{place.startTime} PM </span>-<span>{place.endTime} PM </span> |{" "}
          <span>${place.price}</span>
        </p>
        <p className="text-[#6B7280]">{place.description}</p>
      </div>
    </div>
  )
}
