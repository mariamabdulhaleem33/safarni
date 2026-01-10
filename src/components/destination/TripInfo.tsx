import StarRating from "./StarRating"

export default function TripInfo() {
  const FLEX_LAYOUT = "flex justify-between items-center"
  const TYPOGRAPHY =
    "font-poppins font-medium text-[#4B4F63] sm:text-xl text-[14px]"
  return (
    <article className="flex flex-col gap-7">
      <div className={FLEX_LAYOUT}>
        <h2 className="text-gray-900 md:text-[25px] text-[21px] font-medium font-poppins">
          Eiffel Tower
        </h2>
        <StarRating rating={4.3} variant="reviewTour" />
      </div>
      <div className={FLEX_LAYOUT}>
        <span className={TYPOGRAPHY}>City Breaks</span>
        <span className={TYPOGRAPHY}>7 Days and 6 Nights</span>
        <span className={TYPOGRAPHY}>Paris, France</span>
      </div>
    </article>
  )
}
