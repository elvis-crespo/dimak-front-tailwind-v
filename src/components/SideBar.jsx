/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Icon from "./Icons/Icon";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Logomin } from "../../public/Logomin";
import { Logo } from "../../public/Logo";
import Particles from "./Particles";

export const Sidebar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebarVisibility = () => setIsSidebarVisible((prev) => !prev);

  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setIsSidebarVisible(false);
    }
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsSidebarVisible(false); // close the sidebar after navigation
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // sidebar items
  const sidebarItems = [
    {
      label: "Dashboard",
      title: "Dashboard",
      icon: "icon-home-sb",
      path: "/home",
    },
    {
      label: "Guardar",
      title: "New register",
      icon: "icon-save-sb",
      path: "/register",
    },
    {
      label: "Buscar",
      title: "Search register",
      icon: "icon-search-sb",
      path: "/search",
    },
    {
      label: "Modificar",
      title: "Update register",
      icon: "icon-update-sb",
      path: "/update",
    },
    {
      label: "Eliminar",
      title: "Delete register",
      icon: "icon-delete-sb",
      path: "/delete",
    },
  ];

  // if (isAdmin) {
  //   sidebarItems.push({ label: "Eres un puto admin?", icon: "icon-user", path: "/admin" });
  // }

  return (
    <>
      <Icon
        name="icon-menu"
        className="z-10 w-7 h-7 absolute top-5 left-5 md:hidden"
        onClick={toggleSidebarVisibility}
      />

      <aside
        ref={sidebarRef}
        className={`
          fixed z-50 left-0 top-0 h-full p-4 flex flex-col justify-between
          border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black
          overflow-hidden transition-all duration-300 ease-in-out
          ${isSidebarVisible ? "w-64" : "w-[72px]"}
          md:flex md:${isSidebarVisible ? "w-64 flex" : "w-[72px] hidden"}
          xl:w-64
        `}
      >
        <Particles />
        <div className="z-10">
          <div className="flex items-center justify-center h-16 rounded-xl mb-8 relative">
            <Logomin
              className={`w-10 h-10 transition-all duration-300 ${isSidebarVisible ? "opacity-0 scale-0" : "opacity-100 scale-100"
                } xl:opacity-0 xl:scale-0`}
              currentColor={theme === "dark" ? "#fff" : "#000"}
            />
            <Logo
              theme={theme}
              className={`w-36 h-auto absolute transition-all duration-300 ${isSidebarVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                } xl:opacity-100 xl:scale-100`}
              animate={false}
            />
          </div>

          <nav className="flex flex-col mt-6">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                label={item.label}
                title={item.title}
                icon={<Icon name={item.icon} className="w-6 h-6" />}
                active={location.pathname.startsWith(item.path)}
                isSidebarVisible={isSidebarVisible}
                onClick={() => handleMenuItemClick(item.path)}
              />
            ))}
          </nav>
        </div>

        <div className="z-50 flex flex-col items-center gap-4">
          <ThemeToggle />
          <button
            ref={toggleButtonRef}
            onClick={toggleSidebarVisibility}
            className="w-10 h-10 flex items-center justify-center rounded-full xl:hidden bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Icon name="arrow-right" className={`${isSidebarVisible ? "rotate-180" : ""} transition-all duration-300`} />
          </button>
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">
            v1.1 Dimak
          </span>
        </div>
      </aside>
    </>
  );
};
