import { Link } from "react-router-dom";

export const NavigationLinks = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Favorite", path: "/favorite" },
    { name: "Compare", path: "/compare" },
    { name: "maps", path: "/maps" },
  ];

  return (
    <nav className="flex items-center gap-8 lg:gap-[64px] w-auto lg:w-[525px] h-9">
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`h-9 text-lg lg:text-[24px] leading-[100%] transition-colors inline-flex items-center ${
              isActive
                ? "text-[#1E429F] font-semibold"
                : "text-[#111928] font-medium"
            }`}
            style={{ fontFamily: "Poppins" }}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};
