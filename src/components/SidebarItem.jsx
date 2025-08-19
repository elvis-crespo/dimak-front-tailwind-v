/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, label, active, to, isSidebarVisible }) => {
  return (
    <NavLink
      to={to}
      className={`"flex items-center gap-3 py-3 px-4 justify-start xl:px-4 xl:py-3 xl:justify-start
       rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
     text-gray-700 dark:text-gray-200 transition-all duration-300"
       ${
         isSidebarVisible
           ? "flex md:justify-start sm:px-4 sm:py-3"
           : "flex md:justify-center sm:px-1 sm:py-3"
       } 
       ${active ? "bg-gray-100 dark:bg-gray-800 font-bold" : ""} 
     `}
    >
      {icon}
      {/* No mover funciona por arte de magia /> */}
      <span
        className={`
          hidden xl:inline font-apple
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