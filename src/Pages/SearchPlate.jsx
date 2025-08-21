import Layout from "../components/Layout";
import {
  FormTitle,
} from "../components/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance.js";
import { validateFields } from "../utils/validateFields.js";
import { CustomerTable } from "../components/CustomTable.jsx";

export default function SearchPlate() {
  const columnsHeader = ["Placa", "Propietario", "Marca", "Modelo", "Año"];
  const columnKeys = ["plate", "ownerName", "brand", "model", "year"];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
        confirmButtonColor: "#1447e6",
      });
    }

    if (inputValue.trim() === lastSearchedValue) {
      return Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "Ya has buscado esta placa.",
        confirmButtonColor: "#1447e6",
      });
    }

    // Validar la placa antes de enviar
    const validationError = validateFields.plate(inputValue.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
        confirmButtonColor: "#1447e6",
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
      setIsLoading(true);
      setData([]);
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.response && error.response.status === 404) {
        setData([]);
        // setAllFetched(false);
        Swal.fire({
          icon: "info",
          title: "No encontrado",
          text: `No existe ningún vehículo registrado con la placa ${inputValue}.`,
        });
        if (
          error.message === "Network Error" ||
          error.code === "ECONNREFUSED"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
          });
        } else if (!error.response) {
          // Otro tipo de error en la respuesta del servidor (sin respuesta)
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
      }
      return error.response.data;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className=" w-full max-w-3xl appear mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg font-display gap-4">
          <FormTitle>Consiltar datos de vehículo</FormTitle>
          <form
            className="flex flex-col md:flex-row gap-4 mb-6 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="plate"
              name="plate"
              autoComplete="off"
              placeholder="Buscar por placa (AAA-1234 o AA-123A)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
            showActions={true}
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />
        </div>
      </Layout>
    </>
  );
}
