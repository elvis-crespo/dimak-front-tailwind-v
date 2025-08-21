import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../utils/config";

export default function Filter() {
  const [documentID, setDocumentID] = useState("");
  const [employees, setEmployees] = useState([]);
  const [lastSearchedID, setLastSearchedID] = useState(null);
  const [allFetched, setAllFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!documentID.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingresa una cédula para buscar.",
      });
    }

    if (documentID === lastSearchedID) {
      return Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "Ya has buscado este número de cédula.",
      });
    }

    try {
      setIsLoading(true); 
      setEmployees([]); 
      const response = await axios.get(
        `${API_BASE_URL}findByDocumentID/${documentID}`
      );
      setEmployees([response.data]);
      setLastSearchedID(documentID);
      setAllFetched(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setEmployees([]);
        setAllFetched(false);
        Swal.fire({
          icon: "info",
          title: "No encontrado",
          text: "No se encontró ningún empleado con esa cédula.",
        });
      } else if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Ocurrió un error en el servidor. Por favor, inténtalo más tarde.",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: `Ocurrió un error al buscar al empleado. Error: ${error.response}`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAll = async () => {
    if (allFetched) {
      return Swal.fire({
        icon: "info",
        title: "Información",
        text: "Ya se han cargado todos los empleados.",
      });
    }

    try {
      setIsLoading(true);
      setLastSearchedID(null);
      setEmployees([]);

      const response = await axios.get(`${API_BASE_URL}findall`);
      setEmployees(response.data);
      setAllFetched(true);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Ocurrido un error en el servidor. Por favor, reintenta mas tarde.",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: `Ocurrió un error al buscar a los empleados. Error: ${error.response}`,
        });
      }
    } finally {
      setIsLoading(false);
      setDocumentID("");
    }
  };

  return (
    <div className="appear max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg font-display">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Consulta de Empleados
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          id="cedula"
          name="cedula"
          placeholder="Buscar por cédula"
          value={documentID}
          onChange={(e) => setDocumentID(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`font-semibold px-6 py-2 cursor-pointer rounded-lg transition ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
        <button
          type="button"
          onClick={handleShowAll}
          disabled={isLoading}
          className={`font-semibold px-6 py-2 cursor-pointer rounded-lg transition ${
            isLoading
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
          }`}
        >
          {isLoading ? "Cargando..." : "Ver Todos"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Cédula</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Estado Vacunación</th>
              <th className="px-4 py-2 text-left">Vacuna</th>
              <th className="px-4 py-2 text-left">Dosis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Cargando datos...
                </td>
              </tr>
            ) : employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.documentID}>
                  <td className="px-4 py-2">{emp.documentID || "❌"}</td>
                  <td className="px-4 py-2">
                    {emp.firstName} {emp.lastName || "❌"}
                  </td>
                  <td className="px-4 py-2">{emp.email || "❌"}</td>
                  <td className="px-4 py-2">{emp.vaccinationStatus || "❌"}</td>
                  <td className="px-4 py-2">{emp.vaccine || "❌"}</td>
                  <td className="px-4 py-2">{emp.numberDoses || "❌"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No hay empleados para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold cursor-pointer group"
          type="button"
          onClick={() => navigate("/")}
        >
          <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2"> Ir al Inicio</p>
        </button>
      </div>
    </div>
  );
}
