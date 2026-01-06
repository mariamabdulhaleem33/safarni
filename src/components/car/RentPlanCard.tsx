import { Clock, Calendar } from "lucide-react";

interface RentPlanCardProps {
  icon: "hourly" | "daily";
  price: number;
  title: string;
  desc: string;
  active?: boolean;
}

const RentPlanCard = ({
  icon,
  price,
  title,
  desc,
  active = false,
}: RentPlanCardProps) => {
  const Icon = icon === "hourly" ? Clock : Calendar;

  return (
    <>
    <div
      className={`flex overflow-hidden rounded-xl border min-h-[110px]
      ${active ? "border-blue-400" : "border-gray-200"}`}
    >
      {/* Left Side (icon + price) */}
      <div
        className={`flex w-36 flex-col items-center justify-center gap-2
        ${active ? "bg-blue-100" : "bg-gray-100"}`}
      >
        <Icon
          size={22}
          className={active ? "text-blue-600" : "text-gray-500"}
        />
        <span
          className={`text-lg font-semibold
          ${active ? "text-blue-600" : "text-gray-700"}`}
        >
          ${price}
        </span>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center px-5 py-4">
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
    </>
  );
};

export default RentPlanCard;