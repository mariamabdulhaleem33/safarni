import type { RecommendationCardProps, TourCardProps } from "@/types/home.type";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

type TCardProps = RecommendationCardProps | TourCardProps;

const TourCard = (props: TCardProps) => {
    const { variant, image, location, rating, title } = props;
    return (
        <div className={` ${variant === "recommendation" ? "flex flex-col shadow-[0_0_26.37px_rgba(111,111,111,0.25)]" : "flex shadow-lg"} p-4  rounded-3xl  gap-4`}>
            <img src={image} alt="tour image" className={`${variant === "recommendation" ? "w-full h-65.5" : "w-37.5 h-full"} object-cover rounded-3xl`} />
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center ">
                    <h6 className={`font-medium ${variant === "recommendation" ? "text-[#111928]" : "text-[#6B7280]"}`}>{title}</h6>
                    <h6 className="font-medium text-[#111928] flex items-center gap-1">
                        <span className="text-[#FCBA42]"><FaStar /></span>{rating}
                    </h6>
                </div>
                {variant === "recommendation" ? <p className="text-[18px] text-[#9CA3AF] flex items-center  gap-1"><span className="text-[25px] text-[#1C64F2]"><IoLocationOutline /></span> {location}</p> : <h6 className="text-[#111928] text-[25px] font-medium">{location}</h6>}
                {variant === "tour" && (
                    <p className="text-[20px] text-[#6B7280] font-semibold">
                        From <span className="text-[#1C64F2]">{(props as TourCardProps).price}$</span> Per Person
                    </p>
                )}
            </div>
        </div>
    )
}

export default TourCard
