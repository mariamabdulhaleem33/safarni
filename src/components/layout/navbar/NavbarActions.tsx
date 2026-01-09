// components/NavbarActions.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { SearchIcon, FilterIcon } from "../../icons";
import { useUserProfile } from '../../../hooks/useUserProfile';

interface NavbarActionsProps {
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onUserClick?: () => void;
}

export const NavbarActions = ({
  onSearchClick,
  onFilterClick,
  onUserClick,
}: NavbarActionsProps) => {
  const navigate = useNavigate();
  const { loading, avatarUrl } = useUserProfile();
  const [imageError, setImageError] = useState(false);

  const showFallback = !avatarUrl || imageError;

  return (
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 w-auto lg:w-45 h-10">
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
        onClick={() => {
          onUserClick?.();
          navigate("/profile");
        }}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="User profile"
      >
        {loading ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 animate-pulse" />
        ) : showFallback ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
            <UserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
          </div>
        ) : (
          <img
            src={avatarUrl}
            alt="User profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
            onError={() => setImageError(true)}
          />
        )}
      </button>
    </div>
  );
};