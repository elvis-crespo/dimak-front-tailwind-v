import React from "react";
import PropTypes from "prop-types";
import { Logomin } from "../../public/Logomin";

const SidebarLogo = React.memo(function SidebarLogo({ theme, isSidebarVisible }) {
  return (
    <div className="flex items-center justify-center h-16 rounded-xl lg:bg-gray-100 lg:dark:bg-gray-800 mb-8">
      <Logomin
        className={`flex lg:hidden w-10 h-10 ${
          isSidebarVisible ? "hidden" : "flex"
        }`}
        currentColor={theme === "dark" ? "#fff" : "#000"}
      />

      <img
        src={
          theme === "dark"
            ? "/assets/images/logo-dark.svg"
            : "/assets/images/logo-light.svg"
        }
        alt="dimak-logo"
        className={`w-36 h-auto transition-all duration-500 animate-fadeInScale ${
          isSidebarVisible ? "flex" : "hidden"
        }`}
      />
    </div>
  );
});

SidebarLogo.displayName = "SidebarLogo";

SidebarLogo.propTypes = {
  theme: PropTypes.string.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
};

export default SidebarLogo;
