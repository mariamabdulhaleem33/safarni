import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavigationLinksProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export const NavigationLinks = ({
  mobile = false,
  onLinkClick,
}: NavigationLinksProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "Favorite", path: "/favorite" },
    { name: "Compare", path: "/compare" },
    { name: "maps", path: "/maps" },
  ];

  if (mobile) {
    const handleLinkClick = (path: string) => {
      if (onLinkClick) {
        onLinkClick();
      }
      setTimeout(() => {
        navigate(path);
      }, 150);
    };

    return (
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.path)}
              className={`w-full text-left px-4 py-2.5 text-base leading-none transition-colors inline-flex items-center font-poppins rounded-lg ${
                isActive
                  ? "text-primary-700 font-semibold bg-primary-50"
                  : "text-gray-900 font-medium hover:bg-gray-50"
              }`}
            >
              {link.name}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-8 lg:gap-16 w-auto lg:w-131.25 h-9">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`h-9 text-[18px] leading-none transition-colors inline-flex items-center font-poppins ${
              isActive
                ? "text-primary-700 font-semibold"
                : "text-gray-900 font-medium"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};
