import { Link, useLocation } from "react-router-dom";

export const NavigationLinks = () => {
  const location = useLocation();
  const links = [
    { name: "Home", path: "/" },
    { name: "Favorite", path: "/favorite" },
    { name: "Compare", path: "/compare" },
    { name: "maps", path: "/maps" },
  ];

  return (
    <nav className="flex items-center gap-8 lg:gap-16 w-auto lg:w-131.25 h-9">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`h-9 text-lg lg:text-2xl leading-none transition-colors inline-flex items-center font-poppins ${
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
