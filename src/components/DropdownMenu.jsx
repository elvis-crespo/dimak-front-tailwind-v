import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/userReducer";
import Icon from "./Icons/Icon";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  // const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const letter =
    String(
      user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    )[0] || "A";

  return (
    <>
      <button
        onClick={toggleMenu}
        ref={toggleButtonRef}
        className="z-10 absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white border-0 cursor-pointer text-lg 
          flex items-center justify-center shadow hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {letter}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 top-16 right-4 w-72 sm:w-80 md:w-96 max-w-full 
              bg-white dark:bg-gray-900 
              border border-gray-200 dark:border-gray-700 
              rounded-xl overflow-hidden shadow-lg 
              transition-all duration-300
              ${isOpen ? "animate-fadeInScale" : "animate-fadeOutScale"}`}
        >
          <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-700 to-red-600">
            <p className="text-xs font-medium text-red-200 uppercase tracking-wider">
              Signed in as
            </p>
            <div className="flex items-center mt-1">
              <div className="bg-red-100 dark:bg-red-800 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <Icon
                  name="icon-user"
                  className="w-5 h-5 text-red-600 dark:text-red-200"
                />
              </div>
              <p className="text-sm font-medium text-white truncate hover:after:w-full relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#2b6cb0] after:transition-all after:duration-300">
                {user?.[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ] || "Usuario"}
              </p>
            </div>
          </div>

          <div className="py-1.5">
            <a
              href="#"
              className="group relative flex items-center px-4 py-2.5 text-sm 
                 text-gray-700 dark:text-gray-200 
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-crosshair"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gray-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">
                <Icon
                  name="icon-email"
                  className="h-6 w-6 text-gray-600 dark:text-gray-300"
                />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {user?.email || "Correo"}
              </span>
            </a>

            <a
              href="#"
              className="group relative flex items-center px-4 py-2.5 text-sm 
                 text-gray-700 dark:text-gray-200 
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-crosshair"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gray-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">
                <Icon
                  name="icon-role"
                  className="h-6 w-6 text-gray-600 dark:text-gray-300"
                />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {user?.[
                  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] || "Rol"}
              </span>
            </a>

            <a
              onClick={handleLogout}
              className="group relative flex items-center px-4 py-2.5 text-sm 
                 text-gray-700 dark:text-gray-200 
                 hover:bg-red-50 dark:hover:bg-red-900/50 transition-all duration-200 cursor-pointer"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-800 flex items-center justify-center mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-700 transition-colors duration-200">
                <Icon
                  name="icon-login"
                  className="h-5 w-5 text-red-500 dark:text-red-300 group-hover:text-red-600 dark:group-hover:text-red-50"
                />
              </div>
              <span className="font-medium text-red-500 dark:text-red-300 group-hover:text-red-600 dark:group-hover:text-red-50">
                Cerrar Sesión
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
