/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Icon from "./Icons/Icon";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { Logomin } from "../../public/Logomin";
import Particles from "./Particles";

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
    navigate(path);
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
        className="z-10 w-6 h-6 absolute top-5 left-5 md:hidden"
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
        <Particles enableMouseInteraction={true} />
        <div className="z-10">
          <div className="flex items-center justify-center h-16 rounded-xl mb-8 relative">
            <Logomin
              className={`
                w-10 h-10 transition-all duration-300
                ${
                  isSidebarVisible
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                }
                xl:opacity-0 xl:scale-0
              `}
              currentColor={theme === "dark" ? "#fff" : "#000"}
            />
            <img
              src={
                theme === "dark"
                  ? "/assets/images/logo-dark.svg"
                  : "/assets/images/logo-light.svg"
              }
              alt="dimak-logo"
              className={`
                w-36 h-auto absolute transition-all duration-300
                ${
                  isSidebarVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                }
                xl:opacity-100 xl:scale-100
              `}
            />
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            <SidebarItem
              label="Home"
              icon={<Icon name="icon-house" />}
              isSidebarVisible={isSidebarVisible}
              active={location.pathname === "/home"}
              to="/home"
            />
            {isAdmin && (
              <>
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

        <div className="z-50 flex flex-col items-center gap-4">
          <ThemeToggle />
          <button
            ref={toggleButtonRef}
            onClick={toggleSidebarVisibility}
            className="w-10 h-10 flex items-center justify-center rounded-full xl:hidden bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSidebarVisible ? (
              <Icon name="arrow-left" className="transition-all duration-300" />
            ) : (
              <Icon
                name="arrow-right"
                className="transition-all duration-300"
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