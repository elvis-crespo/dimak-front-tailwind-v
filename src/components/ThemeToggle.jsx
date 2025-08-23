import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme, toggleTheme } from "../redux/themeReducer";
import Icon from "./Icons/Icon";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Aplicar clase .dark en <html> y persistir
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Escuchar cambios del sistema y actualizar Redux
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [dispatch]);

  return (
    <>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-white flex items-center justify-center shadow cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
        >
            {theme === "dark" ? (
              <>
                <Icon name="icon-light" />
              </>
            ) : (
              <>
                <Icon name="icon-dark" />
              </>
            )}
        </button>
    </>
  );
}
