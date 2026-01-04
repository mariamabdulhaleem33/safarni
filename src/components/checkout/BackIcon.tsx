import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
const BackIcon = ({ url }: { url: string }) => {
  return (
    <Link to={`${url} ?? #`}>
      <div className="h-15 w-15 rounded-full bg-[#F4F4F4] flex items-center justify-center mb-4">
        <ChevronLeft size={30} />
      </div>
    </Link>
  );
};

export default BackIcon;
