/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./Hooks/useAuth";

const RegisterCards = React.lazy(() => import("./Pages/RegisterCards"));
const RegisterVehicle = React.lazy(() => import("./Pages/RegisterVehicle"));
const ResgisterIntallations = React.lazy(() =>
  import("./Pages/RegisterInstallations")
);

const UpdateCards = React.lazy(() => import("./Pages/UpdateCards"));
const UpdateVehicle = React.lazy(() => import("./Pages/UpdateVehicle"));
const UpdateInstallation = React.lazy(() =>
  import("./Pages/UpdateInstallation")
);

const SearchCards = React.lazy(() => import("./Pages/SearchCards"));
const SearchPlate = React.lazy(() => import("./Pages/SearchPlate"));
const InstallationsTable = React.lazy(() =>
  import("./Pages/InstallationsTable")
);

const DeleteCards = React.lazy(() => import("./Pages/DeleteCards"));
const DeleteVehicle = React.lazy(() => import("./Pages/DeleteVehicle"));
const DeleteInstallation = React.lazy(() =>
  import("./Pages/DeleteInstallation")
);

const Login = React.lazy(() => import("./Pages/Login"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Home = React.lazy(() => import("./Pages/Home"));

function App() {
  const { isLoggedIn } = useAuth();

  const { user } = useSelector((state) => state.user);
  const isAdmin =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "Admin";

  return (
    <BrowserRouter
      // basename={process.env.PUBLIC_URL}
      future={{
        v7_startTransition: true, // Habilitar la future flag
        v7_relativeSplatPath: true,
      }}
    >
      {/* {isLoggedIn && (
        <>
          <Sidebar isAdmin={isAdmin}></Sidebar>
          <DropdownMenu />
        </>
      )} */}
      <Suspense
        fallback={
          <div
            style={{
              paddingLeft: "280px",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            Loading... Please wait
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<NotFound />} />
          {isLoggedIn ? (
            <Route path="/" element={<Navigate to="/*" />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}

          <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterCards />} />
            <Route path="/register-vehicle" element={<RegisterVehicle />} />
            <Route
              path="/register-installation"
              element={<ResgisterIntallations />}
            />
            <Route path="/search" element={<SearchCards />} />
            <Route path="/search-plate" element={<SearchPlate />} />
            <Route
              path="/instllations-records"
              element={<InstallationsTable />}
            />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isLoggedIn && isAdmin} />}>
            <Route path="/delete" element={<DeleteCards />} />
            <Route path="/delete-vehicle" element={<DeleteVehicle />} />
            <Route
              path="/delete-installation"
              element={<DeleteInstallation />}
            />
            <Route path="/update" element={<UpdateCards />} />
            <Route path="/update-vehicle" element={<UpdateVehicle />} />
            <Route
              path="/update-installation"
              element={<UpdateInstallation />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
