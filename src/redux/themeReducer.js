// import { createSlice } from "@reduxjs/toolkit";

// // Función para obtener el tema preferido del sistema o desde localStorage
// const getInitialTheme = () => {
//   // Intenta obtener el tema del localStorage
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme) {
//     return savedTheme;
//   }

//   // Si no hay tema guardado, devuelve la preferencia del sistema
//   const prefersDarkScheme = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;
//   return prefersDarkScheme ? "dark" : "light";
// };

// const initialState = {
//   theme: getInitialTheme(), // Inicializa el tema con la preferencia guardada o del sistema
// };

// export const themeSlice = createSlice({
//   name: "theme",
//   initialState: initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       // Alterna el tema y guarda el nuevo en localStorage
//       const newTheme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", newTheme);
//       return { ...state, theme: newTheme };
//     },
//     setTheme: (state, action) => {
//       // Establece el tema manualmente y lo guarda en localStorage
//       localStorage.setItem("theme", action.payload);
//       return { ...state, theme: action.payload };
//     },
//     setSystemTheme: (state, action) => {
//       // Establece el tema basado en la preferencia del sistema
//       localStorage.setItem("theme", action.payload);
//       return { ...state, theme: action.payload };
//     },
//   },
// });

// export const { toggleTheme, setTheme, setSystemTheme } = themeSlice.actions;

// export default themeSlice.reducer;


// store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Detectar tema inicial (localStorage > sistema)
const getInitialTheme = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    theme: getInitialTheme(),
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
