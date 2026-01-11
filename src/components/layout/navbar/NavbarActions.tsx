import { SearchIcon, FilterIcon } from "../../icons";
import userImage from "../../../assets/user.png";
import { useNavigate } from 'react-router-dom';

interface NavbarActionsProps {
  userPhotoUrl?: string;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onUserClick?: () => void;
}

export const NavbarActions = ({
  userPhotoUrl,
  onSearchClick,
  onFilterClick,
  onUserClick,
}: NavbarActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 w-auto lg:w-[180px] h-9">
      <button
        onClick={() => {
          onSearchClick?.();
          navigate("/search");
        }}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onFilterClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="Filter"
      >
        <FilterIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => {
          onUserClick?.();
          navigate("/profile");
        }} className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
        aria-label="User profile"
      >
        <img
          src={userPhotoUrl || userImage}
          alt="User profile"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
        />
      </button>
    </div>
  );
};
