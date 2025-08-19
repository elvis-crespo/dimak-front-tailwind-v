import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../utils/config";

const storedUser = localStorage.getItem("user");
const initialStateFromStorage = storedUser ? JSON.parse(storedUser) : null;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCred) => {
    const request = await axios.post(`${API_BASE_URL}/auth/login`, userCred, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = request.data;

    const userData = jwtDecode(response.accessToken);

    localStorage.setItem(
      "user",
      JSON.stringify({
        user: userData,
        auth: response,
      })
    );

    return { user: userData }; 
  }
);

// Acción para actualizar los datos del usuario y el token en Redux sin realizar login
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ response, userData }) => {
    // Guarda los nuevos datos en localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        user: userData,
        auth: response,
      })
    );

    // Devuelve los nuevos datos
    return { user: userData };
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user"); 
    localStorage.removeItem("theme"); 
  }
  return null; 
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: initialStateFromStorage?.user || null, // Usar datos de localStorage si existen
    error: null,
    isLoggedIn: initialStateFromStorage ? true : false, // Verifica si el usuario está logueado
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        if (action.error.message === "Request failed with status code 401")
          state.error = "Incorrect credentials! Wrong Password.";
        else if (action.error.message === "Request failed with status code 404")
          state.error = "Incorrect credentials! User not found.";
        else state.error = "Unknown error. Please try again later.";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
