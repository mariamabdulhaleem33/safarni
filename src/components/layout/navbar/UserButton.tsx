import { LogIn, User, UserPlus } from "lucide-react";
import { useState } from "react";
import userImage from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

const UserButton = ({
  userPhotoUrl,
  onUserClick,
  style,
}: {
  userPhotoUrl?: string;
  onUserClick?: () => void;
  style: string;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (isLoggedIn) {
      onUserClick?.();
      navigate("/profile");
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="User profile"
      >
        {isLoggedIn ? (
          <img
            src={userPhotoUrl || userImage}
            alt="User profile"
            className={style}
          />
        ) : (
          <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5  text-gray-600" />
        )}
      </button>

      {!isLoggedIn && dropdownOpen && (
        <div className="absolute right-0 mt-2 sm:w-36 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <button
            onClick={() => navigate("/auth/login")}
            className="w-full flex justify-start items-center gap-2 text-left px-4 py-2 text-xs md:text-lg hover:bg-gray-100"
          >
            <LogIn className="w-3 h-3 sm:w-4 sm:h-4 md:h-5 md:w-5" />
            Login
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="w-full flex justify-start items-center gap-2 text-left px-4 py-2 text-xs md:text-lg hover:bg-gray-100"
          >
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 md:h-5 md:w-5" />
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
