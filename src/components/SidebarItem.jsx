/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, label, active, to, isSidebarVisible, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={`
        flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-300
        text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#ff0000] my-0 md:my-1
        xl:justify-start xl:px-4 xl:py-3
        ${isSidebarVisible ? "justify-start px-4 py-3" : "justify-center px-1 py-3"}
        ${active ? "bg-gray-100 dark:bg-[#ff0000] font-bold" : ""}
        ${className}
      `}
    >
      {icon}
      <span
        className={`
          font-apple hidden xl:inline
          ${isSidebarVisible ? "inline" : "hidden"}
          ${active ? "font-bold" : "font-normal"}
        `}
      >
        {label}
      </span>
    </NavLink>
  );
};

export default SidebarItem;