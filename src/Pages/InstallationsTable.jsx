/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import { validateFields } from "../utils/validateFields.js";
import axiosInstance from "../utils/axiosInstance";
import Layout from "../components/Layout.jsx";
import FormTitle from "../components/Form/FormTitle.jsx";
import { CustomerTable } from "../components/CustomTable.jsx";

export default function InstallationsTable() {
  const columnsHeader = [
    "Placa",
    "Nº de Factura",
    "Nº de ficha técnica",
    "Detalles de la Instalación",
    "Técnico",
    "Fecha",
    "Imagen",
  ];
  const columnKeys = [
    "plateId",
    "invoiceNumber",
    "technicalFileNumber",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.trim() === lastSearchedValue) return;

    // Validar la placa antes de enviar
    const validationError = validateFields.invoiceNumber(inputValue.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = [response.data];
      setData(transform);
      setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.get(
        `/installation/?invoiceNumber=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        // Error de conexión, el servidor no está disponible
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else {
        // Si hay una respuesta del servidor con un error (404, 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.response.data?.message || error.message}`,
        });
      }

      return error.response.data;
    }
  };

  return (
    <>
      <Layout>
        <div className="w-full max-w-7xl appear mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg font-display gap-4">
          <FormTitle>Consulta de Instalaciones</FormTitle>
          <form
            className="flex flex-col md:flex-row gap-4 mb-6 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              autoComplete="off"
              placeholder="Buscar por número de factura (001-001-123456789 o 001-001-op3456789)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 dark:text-white rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onClick={() => {
                alert("Ver Todos");
              }}
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
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />
        </div>
      </Layout>
    </>
  );
}