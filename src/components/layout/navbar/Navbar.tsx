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
    <nav className="fixed top-0 left-0 right-0 z-50 w-full h-[110px] bg-white">
      <div className="max-w-[1440px] h-full mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-[100px]">
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
