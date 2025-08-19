import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../redux/userReducer";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/config";
import Swal from "sweetalert2";

export const useAuth = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkAuth = () => {
    const token = localStorage.getItem("user");

    if (!token) {
      dispatch(logoutUser());
      return;
    }

    const tokenObj = JSON.parse(token);
    const authToken = tokenObj?.auth;
    const nameIdentity =
      user?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const refreshToken = authToken?.refreshToken;

    if (!authToken) {
      dispatch(logoutUser());
      return;
    }

    const decoded = jwtDecode(authToken.accessToken);
    if (!decoded) {
      dispatch(logoutUser());
      return;
    }

    const isTokenValid = decoded.exp * 1000 > Date.now();
    const wasSuspended = localStorage.getItem("wasSuspended") === "true";

    // 1️⃣ CASO: Si el token expiró mientras la pestaña estaba oculta, hacer logout directo.
    if (!isTokenValid && wasSuspended) {
      dispatch(logoutUser());
      localStorage.removeItem("wasSuspended");
      return;
    }

    // 2️⃣ CASO: Si el token sigue siendo válido, limpiar la suspensión y permitir uso normal.
    if (isTokenValid && wasSuspended) {
      localStorage.removeItem("wasSuspended");
      return; // No hacer nada, solo permitir seguir usando la app.
    }

    // 3️⃣ CASO: Si el token expira y la pestaña está activa, mostrar el SweetAlert.
    if (!isTokenValid && document.visibilityState === "visible") {
      Swal.fire({
        title: "Tu sesión ha expirado",
        html: "¿Deseas continuar trabajando?<br><b></b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "No, salir",
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          const timer = Swal.getPopup().querySelector("b");
          setInterval(() => {
            if (timer) {
              timer.textContent = ` Se cerrará en ${Swal.getTimerLeft()} ms`;
            }
          }, 100);
        },
        willClose: () => {
          localStorage.removeItem("wasSuspended");
        },
      }).then((result) => {
        if (result.isConfirmed) {
          refreshTokenRequest(nameIdentity, refreshToken);
        } else {
          dispatch(logoutUser());
        }
      });
    }
  };

  const refreshTokenRequest = async (nameIdentifier, refreshToken) => {
    try {
      const request = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        { userId: nameIdentifier, refreshToken: refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      const response = request.data;
      const newAccessToken = response.accessToken;

      if (!newAccessToken) {
        dispatch(logoutUser());
        return;
      }

      const userData = jwtDecode(newAccessToken);
      dispatch(updateUser({ response, userData }));
    } catch (error) {
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("wasSuspended", "true");
      } else {
        localStorage.removeItem("wasSuspended");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    checkAuth();

    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        checkAuth();
      }, 8 * 60 * 60 * 1000);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, isLoggedIn]);

  return { isLoggedIn, user };
};
