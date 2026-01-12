// import { SearchIcon, FilterIcon } from "../../icons";
// import { useNavigate } from "react-router-dom";
// import UserButton from "./UserButton";

// interface NavbarActionsProps {
//   onSearchClick?: () => void;
//   onFilterClick?: () => void;
//   onUserClick?: () => void;
// }

// export const NavbarActions = ({
//   onSearchClick,
//   onFilterClick,
//   onUserClick,
// }: NavbarActionsProps) => {
//   const navigate = useNavigate();
//   // const { loading, avatarUrl } = useUserProfile();

//   const handleUserClick = () => {
//     onUserClick?.();

//     const token = localStorage.getItem("token");
//     navigate(token ? "/profile" : "/auth/login");
//   };

//   return (
//     <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 w-auto lg:w-[180px] h-9">
//       <button
//         onClick={() => {
//           onSearchClick?.();
//           navigate("/search");
//         }}
//         className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
//         aria-label="Search"
//       >
//         <SearchIcon className="w-5 h-5" />
//       </button>

//       <button
//         onClick={onFilterClick}
//         className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
//         aria-label="Filter"
//       >
//         <FilterIcon className="w-5 h-5" />
//       </button>
//       <UserButton
//         // userPhotoUrl={userPhotoUrl}
//         onUserClick={onUserClick}
//         style={"w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"}
//       />
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { SearchIcon, FilterIcon } from "../../icons";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { Avatar } from "../../profile/ui/Avatar";

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
  console.log("avatarUrl", avatarUrl);

  const handleUserClick = () => {
    onUserClick?.();

    const token = localStorage.getItem("authToken");
    navigate(token ? "/profile" : "/auth/login");
  };

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
        onClick={handleUserClick}
        className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="User profile"
      >
        {loading ? (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <Avatar src={avatarUrl} size="sm" />
        )}
      </button>
    </div>
  );
};
