import { SearchIcon, FilterIcon } from "../../icons";
import userImage from "../../../assets/user.png";

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
  return (
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-[40px] w-auto lg:w-[180px] h-10">
      <button
        onClick={onSearchClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Search"
      >
        <SearchIcon />
      </button>
      <button
        onClick={onFilterClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Filter"
      >
        <FilterIcon />
      </button>
      <button
        onClick={onUserClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="User profile"
      >
        <img
          src={userPhotoUrl || userImage}
          alt="User profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </button>
    </div>
  );
};
