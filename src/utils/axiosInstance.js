import axios from "axios";
import { API_BASE_URL } from "./config";
import { logoutUser, updateUser } from "../redux/userReducer";
import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store"; // Importa el store de Redux
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenData = localStorage.getItem("user");

    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      const accessToken = parsedToken?.auth?.accessToken;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokenData = localStorage.getItem("user");

      if (tokenData) {
        const parsedToken = JSON.parse(tokenData);
        const refreshToken = parsedToken?.auth?.refreshToken;
        const userId = parsedToken?.user?.nameid; 

        if (refreshToken) {
          try {
            // Solicita un nuevo token
            const refreshResponse = await axios.post(
              `${API_BASE_URL}/auth/refresh-token`,
              { userId, refreshToken },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const newAuthData = refreshResponse.data;
            const newAccessToken = newAuthData.accessToken;

            if (!newAccessToken) {
              store.dispatch(logoutUser());
              return Promise.reject(error);
            }

            const newUserData = jwtDecode(newAccessToken);

            localStorage.setItem(
              "user",
              JSON.stringify({
                user: newUserData,
                auth: newAuthData,
              })
            );

            store.dispatch(
              updateUser({ response: newAuthData })
            );

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          // eslint-disable-next-line no-unused-vars
          } catch (refreshError) {
            store.dispatch(logoutUser());
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
