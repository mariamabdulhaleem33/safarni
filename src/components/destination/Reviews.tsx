import { Button } from "../ui/button"
import Review from "./Review"

export default function Reviews() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 gap-y-5 sm:gap-y-8">
        <Review />
        <Review />
        <Review />
        <Review />
      </div>

      <Button
        variant={"outline"}
        className="text-[#1E429F] md:min-w-90 min-w-70 min-h-10 border-[#1E429F] hover:cursor-pointer mt-5"
      >
        See More
      </Button>
    </div>
  )
}
