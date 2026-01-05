import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { NavbarActions } from "./NavbarActions";

interface NavbarProps {
  userPhotoUrl?: string;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onUserClick?: () => void;
}

export const Navbar = ({
  userPhotoUrl,
  onSearchClick,
  onFilterClick,
  onUserClick,
}: NavbarProps) => {
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full h-27.5 bg-white">
      <div className="max-w-360 h-full mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-25">
        <Logo />
        <NavigationLinks />
        <NavbarActions
          userPhotoUrl={userPhotoUrl}
          onSearchClick={onSearchClick}
          onFilterClick={onFilterClick}
          onUserClick={onUserClick}
        />
      </div>
    </nav>
  );
};
