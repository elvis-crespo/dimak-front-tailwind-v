/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import ThemeToggle from "./ThemeToggle";

export const Sidebar = ({ isAdmin = true }) => {
  const theme = useSelector((state) => state.theme.theme);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = (e) => {
    setIsSidebarVisible(false);
    e.preventDefault();
  };
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const handleLogout = () => {
    setIsSidebarVisible(false);
  };
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
    navigate(path); // Redirige a la ruta deseada
  };

  useEffect(() => {
    setIsSidebarVisible(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Icon
        name="icon-menu"
        className="z-10 w-6 h-6 absolute top-5 left-5 md:hidden "
        onClick={toggleSidebarVisibility}
      />

      <aside
        ref={sidebarRef}
        className={`
          fixed z-10 left-0 top-0 h-full p-4 flex-col justify-between
          border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900
          overflow-hidden transition-all duration-300
          ${isSidebarVisible ? "w-64 flex" : "w-[72px] hidden"} 
          md:flex xl:w-64
        `}
      >
        <div>
          <div className="flex items-center justify-center h-16 rounded-xl bg-gray-100 dark:bg-gray-800 mb-8">
            {theme === "dark" ? (
              <img
                src="/assets/images/logo-dark.svg"
                alt="dimak-logo"
                className="w-36 transition-all duration-500 animate-fadeInScale"
              />
            ) : (
              <img
                src="/assets/images/logo-light.svg"
                alt="dimak-logo"
                className="w-36 transition-all duration-500 animate-fadeInSlight"
              />
            )}
          </div>
          <nav className="flex flex-col gap-2 mt-6">
            <SidebarItem
              label="Home"
              icon={<Icon name="icon-house" />}
              isSidebarVisible={isSidebarVisible}
              active={location.pathname === "/home"}
              to="/home"
            />
            <SidebarItem
              label="Dashboard"
              icon={<Icon name="icon-home" />}
              isSidebarVisible={isSidebarVisible}
              active={location.pathname === "/"}
              to="/"
            />
            <SidebarItem
              icon={<Icon name="icon-delete-sidebar" />}
              label="Usuarios"
              isSidebarVisible={isSidebarVisible}
              active={location.pathname === "/register-vehicle"}
              to="/register-vehicle"
            />
            <SidebarItem
              icon={<Icon name="icon-user" className="w-5 h-5" />}
              label="Admin"
              isSidebarVisible={isSidebarVisible}
              active={location.pathname === "/register-installations"}
              to="/register-installation"
            />
            {isAdmin && (
              <>
                <SidebarItem
                  icon={<Icon name="icon-filter" className="w-5 h-5" />}
                  label="Filtros"
                  isSidebarVisible={isSidebarVisible}
                  to="/delete-vehicle"
                />
                <SidebarItem
                  icon={<Icon name="icon-delete" className="w-5 h-5" />}
                  label="Eliminados"
                  isSidebarVisible={isSidebarVisible}
                  to="/delete-installation"
                />
                <SidebarItem
                  icon={<Icon name="icon-reset" className="w-5 h-5" />}
                  label="update vehicle"
                  isSidebarVisible={isSidebarVisible}
                  to="/update-vehicle"
                />
                <SidebarItem
                  icon={<Icon name="icon-reset" className="w-5 h-5" />}
                  label="update installation"
                  isSidebarVisible={isSidebarVisible}
                  to="/update-installation"
                />
                <SidebarItem
                  icon={<Icon name="icon-save" className="w-5 h-5" />}
                  label="Register Cards"
                  isSidebarVisible={isSidebarVisible}
                  to="/register"
                />
                <SidebarItem
                  icon={<Icon name="icon-save" className="w-5 h-5" />}
                  label="Search Cards"
                  isSidebarVisible={isSidebarVisible}
                  to="/search"
                />
                <SidebarItem
                  icon={<Icon name="icon-reset" className="w-5 h-5" />}
                  label="Update Cards"
                  isSidebarVisible={isSidebarVisible}
                  to="/update"
                />
                <SidebarItem
                  icon={<Icon name="icon-delete" className="w-5 h-5" />}
                  label="Delete Cards"
                  isSidebarVisible={isSidebarVisible}
                  to="/delete"
                />
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4">
          <ThemeToggle />
          <button
            ref={toggleButtonRef}
            onClick={toggleSidebarVisibility}
            className="w-10 h-10 flex items-center justify-center rounded-full xl:hidden bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSidebarVisible ? (
              <Icon
                name="arrow-left"
                className={"transition-all duration-300"}
              />
            ) : (
              <Icon
                name="arrow-right"
                className={"transition-all duration-300"}
              />
            )}
          </button>
          <span className="text-sm text-center text-gray-500 dark:text-gray-400">
            v1.1 Dimak
          </span>
        </div>
      </aside>
    </>
  );
};
